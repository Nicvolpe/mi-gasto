import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import api from "../lib/api";

export default function ExpenseForm() {
  const { register, handleSubmit, formState:{ isSubmitting } } = useForm({
    defaultValues: { category: "food", currency: "ARS", date: new Date().toISOString().slice(0,10) }
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await api.post("/api/expenses/", data);
    navigate("/expenses", { replace: true });
  };

  return (
    <>
      <Navbar />
      <div style={{maxWidth:520, margin:"24px auto"}}>
        <h2>Nuevo gasto</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{display:"grid",gap:12}}>
          <label>Categoría
            <select {...register("category")}>
              <option value="food">Comida</option>
              <option value="transport">Transporte</option>
              <option value="bills">Servicios</option>
              <option value="leisure">Ocio</option>
              <option value="other">Otros</option>
            </select>
          </label>
          <label>Monto
            <input type="number" step="0.01" {...register("amount",{valueAsNumber:true})} />
          </label>
          <label>Moneda
            <input {...register("currency")} />
          </label>
          <label>Fecha
            <input type="date" {...register("date")} />
          </label>
          <label>Nota
            <input {...register("note")} />
          </label>
          <button disabled={isSubmitting}>{isSubmitting ? "Guardando..." : "Guardar"}</button>
        </form>
      </div>
    </>
  );
}
