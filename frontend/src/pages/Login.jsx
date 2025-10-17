import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/api";

export default function Login() {
  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post(
        "/api/auth/token/",                          // <- ruta correcta (con / final)
        { username: data.username, password: data.password },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("token", res.data.access);
      navigate("/", { replace: true });
    } catch (e) {
      console.error("Login error:", e?.message, e?.response?.status, e?.response?.data);
      const d = e.response?.data;
      alert(d?.detail || "No se pudo iniciar sesión");
    }
  };

  return (
    <div style={{maxWidth:420, margin:"60px auto"}}>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{display:"grid",gap:12}}>
        <label>Usuario
          <input {...register("username",{required:true})} />
          {errors.username && <small style={{color:"crimson"}}>Requerido</small>}
        </label>
        <label>Contraseña
          <input type="password" {...register("password",{required:true})} />
          {errors.password && <small style={{color:"crimson"}}>Requerido</small>}
        </label>
        <button disabled={isSubmitting}>{isSubmitting ? "Ingresando..." : "Ingresar"}</button>
      </form>
      <p style={{marginTop:12}}>¿No tenés cuenta? <Link to="/register">Registrate</Link></p>
    </div>
  );
}
