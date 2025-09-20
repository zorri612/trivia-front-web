import { useState } from "react";
import axios from "axios";

export default function AdminRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:4000/api/admin/register", 
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("✅ Registro OK:", res.data);
    setMessage(res.data.message);
  } catch (err) {
    console.error("❌ Error en registro:", err.response || err.message);
    setMessage(err.response?.data?.error || "Error en registro");
  }
};


  return (
  <div className="min-h-screen flex items-center justify-center">
    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-white">
      <h1 className="text-3xl font-bold text-center mb-6">📝 Registro Admin</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-xl bg-white text-black focus:outline-none"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-xl bg-white text-black focus:outline-none"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-xl font-bold hover:scale-105 transition"
        >
          Registrarse
        </button>
      </form>
      <p className="text-center mt-4 text-sm">
        ¿Ya tienes cuenta?{" "}
        <a href="/admin/login" className="text-green-400 hover:underline">
          Inicia sesión
        </a>
      </p>
    </div>
  </div>
);
}
