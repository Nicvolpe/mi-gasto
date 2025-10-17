import Navbar from "../components/Navbar.jsx";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div style={{padding:16}}>
        <h2>Dashboard</h2>
        <p>Acá vamos a mostrar KPIs (total del mes, top categorías, etc.).</p>
      </div>
    </>
  );
}
