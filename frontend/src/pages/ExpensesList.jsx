import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import api from "../lib/api";

export default function ExpensesList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get("/api/expenses/");
      setItems(res.data);
    })();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{padding:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h2>Gastos</h2>
          <Link to="/expenses/new">+ Nuevo gasto</Link>
        </div>
        <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
          <thead>
            <tr><th>Fecha</th><th>Categoría</th><th>Monto</th><th>Moneda</th><th>Nota</th><th></th></tr>
          </thead>
          <tbody>
            {items.map(x=>(
              <tr key={x.id} style={{borderTop:"1px solid #eee"}}>
                <td>{x.date}</td>
                <td>{x.category}</td>
                <td>{x.amount}</td>
                <td>{x.currency}</td>
                <td>{x.note}</td>
                <td><Link to={`/expenses/${x.id}/edit`}>Editar</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
