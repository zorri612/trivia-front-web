import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://trivia-backend-omega.vercel.app/api/admin/login", {
        email,
        password,
      });

      if (res.data.success) {
        // Guardar sesión en localStorage
        localStorage.setItem("admin", JSON.stringify(res.data.admin));

        // Redirigir al dashboard
        navigate("/admin/dashboard");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      console.error("❌ Error en login:", err);
      setError("Error en el servidor");
    }
  };

 return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-white">
        <h1 className="text-3xl font-bold text-center mb-6">🔐 Admin Login</h1>
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
            className="bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Ingresar
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          ¿No tienes cuenta?{" "}
          <a href="/admin/register" className="text-pink-400 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
