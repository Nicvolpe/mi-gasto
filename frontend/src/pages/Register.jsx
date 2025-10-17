import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/api";

export default function Register() {
  const { register, handleSubmit, watch, formState:{ errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await api.post("/api/auth/register/", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      // después de crear el usuario, logueamos
      const res = await api.post("/api/auth/token/", {
        username: data.username,
        password: data.password,
      });
      localStorage.setItem("token", res.data.access);
      navigate("/", { replace: true });
    } catch (e) {
  const data = e.response?.data;
  // DRF suele devolver: { username: ["A user with that username already exists."] }
  const msg =
    data?.username?.[0] ||
    data?.email?.[0] ||
    data?.password?.[0] ||
    data?.detail ||
    "No se pudo registrar.";
  alert(msg);
}

  };

  return (
    <div style={{maxWidth:480, margin:"60px auto"}}>
      <h1>Crear cuenta</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{display:"grid",gap:12}}>
        <label>
          Usuario
          <input {...register("username",{required:true, minLength:3})} />
          {errors.username && <small style={{color:"crimson"}}>Min 3 caracteres</small>}
        </label>
        <label>
          Email
          <input type="email" {...register("email",{required:true})} />
          {errors.email && <small style={{color:"crimson"}}>Email requerido</small>}
        </label>
        <label>
          Contraseña
          <input type="password" {...register("password",{required:true, minLength:6})} />
          {errors.password && <small style={{color:"crimson"}}>Min 6</small>}
        </label>
        <label>
          Repetir contraseña
          <input type="password" {...register("password2",{
            required:true,
            validate: (v)=> v === password || "Las contraseñas no coinciden"
          })} />
          {errors.password2 && <small style={{color:"crimson"}}>{errors.password2.message}</small>}
        </label>
        <button disabled={isSubmitting}>{isSubmitting ? "Creando..." : "Crear cuenta"}</button>
      </form>
      <p style={{marginTop:12}}>
        ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
}
