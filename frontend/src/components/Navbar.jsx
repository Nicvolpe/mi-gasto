import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <nav style={{display:"flex",gap:12,alignItems:"center",padding:12,borderBottom:"1px solid #ddd"}}>
      <Link to="/">MiGasto</Link>
      <Link to="/expenses">Gastos</Link>
      <div style={{marginLeft:"auto"}}>
        <button onClick={onLogout}>Salir</button>
      </div>
    </nav>
  );
}
