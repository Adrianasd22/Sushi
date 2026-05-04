import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar"; // ajusta la ruta a tu Sidebar real

/**
 * Comprueba si existe un token en localStorage.
 * Cuando conectes el backend, aquí también puedes validar
 * la expiración del JWT antes de decidir redirigir.
 */
function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem("token"));
}

export default function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />; //Replace se utiliza para no dejar historial
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}