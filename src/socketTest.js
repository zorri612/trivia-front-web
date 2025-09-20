// socketTest.js
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

// Generar un username aleatorio
const randomUser = {
  userId: Math.floor(Math.random() * 1000).toString(),
  username: "Jugador_" + Math.floor(Math.random() * 1000),
};

socket.on("connect", () => {
  console.log("✅ Conectado con ID:", socket.id);
  socket.emit("join-lobby", randomUser);
});

socket.on("game-start", (data) => {
  console.log("🎉 Partida iniciada!");
  console.log(data);
});

socket.on("new-question", (q) => {
  console.log("❓ Nueva pregunta:", q.enunciado, q.opciones);
});

socket.on("round-update", (update) => {
  console.log("📊 Estado de ronda:", update);
});

socket.on("answer-result", (res) => {
  console.log("📥 Resultado de mi respuesta:", res);
});

socket.on("game-over", (data) => {
  console.log("🏆 Ganador:", data.winner);
});
