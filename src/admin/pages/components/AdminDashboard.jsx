import { useEffect, useState } from "react";
import { Trophy, Clock, Gamepad2, BarChart3 } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [topPlayers, setTopPlayers] = useState([]);
  const [extraStats, setExtraStats] = useState(null);

  useEffect(() => {
    fetch("https://trivia-backend-omega.vercel.app/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));

    fetch("https://trivia-backend-omega.vercel.app/api/admin/top-players")
      .then((res) => res.json())
      .then((data) => setTopPlayers(data));

    fetch("https://trivia-backend-omega.vercel.app/api/admin/extra-stats")
      .then((res) => res.json())
      .then((data) => setExtraStats(data));
  }, []);

  if (!stats) {
    return (
      <p className="text-center mt-10 text-xl text-gray-600 animate-pulse">
        Cargando estadísticas...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-8 text-white">
      <h1 className="text-4xl font-bold mb-10 text-center flex items-center justify-center gap-3">
        <BarChart3 className="w-10 h-10 text-pink-400" />
        Dashboard de Trivia
      </h1>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg">
          <Gamepad2 className="w-8 h-8 mb-2 text-pink-300" />
          <h2 className="text-lg font-semibold">Total de partidas</h2>
          <p className="text-3xl font-bold">{stats.totalGames}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg">
          <Trophy className="w-8 h-8 mb-2 text-yellow-300" />
          <h2 className="text-lg font-semibold">Partidas finalizadas</h2>
          <p className="text-3xl font-bold">{stats.finishedGames}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-6 rounded-2xl shadow-lg">
          <Clock className="w-8 h-8 mb-2 text-white" />
          <h2 className="text-lg font-semibold">Promedio duración</h2>
          <p className="text-xl">
            {extraStats ? `${extraStats.avgDuration}s` : "Cargando..."}
          </p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-6 rounded-2xl shadow-lg">
          <BarChart3 className="w-8 h-8 mb-2 text-white" />
          <h2 className="text-lg font-semibold">Promedio de rondas</h2>
          <p className="text-xl">
            {extraStats ? extraStats.avgRounds : "Cargando..."}
          </p>
        </div>
      </div>

      {/* Tabla últimas partidas */}
      <h2 className="text-2xl font-bold mb-4">📅 Últimas 5 partidas</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-purple-700 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Ganador</th>
              <th className="p-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {stats.lastGames.map((game, idx) => (
              <tr
                key={game._id}
                className={`${
                  idx % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600 transition`}
              >
                <td className="p-3 text-sm">{game._id}</td>
                <td className="p-3">{game.status}</td>
                <td className="p-3 font-semibold text-green-400">
                  {game.winner || "Empate"}
                </td>
                <td className="p-3">
                  {new Date(game.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ranking */}
      <h2 className="text-2xl font-bold mb-4">🏆 Ranking de Jugadores</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-indigo-700 text-left">
              <th className="p-3">#</th>
              <th className="p-3">Jugador</th>
              <th className="p-3">Partidas Jugadas</th>
              <th className="p-3">Ganadas</th>
              <th className="p-3">Puntos Totales</th>
            </tr>
          </thead>
          <tbody>
            {topPlayers.map((p, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600 transition`}
              >
                <td className="p-3 font-bold">
                  {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : idx + 1}
                </td>
                <td className="p-3">{p._id}</td>
                <td className="p-3">{p.gamesPlayed}</td>
                <td className="p-3 text-green-400">{p.gamesWon}</td>
                <td className="p-3 text-yellow-300">{p.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
