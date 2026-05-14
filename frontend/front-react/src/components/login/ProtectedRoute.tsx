import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { useRole } from "../../hooks/useRole";

function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem("auth_token"));
}

// Lee y guarda el token/role de la URL de forma síncrona
function syncTokenFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const role = params.get('role');
  if (token) localStorage.setItem('auth_token', token);
  if (role) localStorage.setItem('role', role);
}

export default function ProtectedRoute() {
  syncTokenFromUrl();

  const role = useRole();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin" && role !== "worker") {
    return <Navigate to="/login" replace />;
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