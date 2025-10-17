import axios from "axios";

export default function Ping() {
  const test = async () => {
    try {
      const r = await axios.get("http://localhost:8000/api/external/rates?base=USD");
      console.log("PING OK", r.status);
      alert("Conexión OK ✅");
    } catch (e) {
      console.error("PING ERROR", e?.message, e?.response?.status, e?.response?.data);
      alert("Error de conexión ❌ — Mirá la consola (Network).");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Test de conexión backend</h2>
      <button onClick={test}>Probar conexión</button>
    </div>
  );
}

