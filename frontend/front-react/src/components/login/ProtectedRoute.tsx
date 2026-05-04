import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem("auth_token"));
}

export default function ProtectedRoute() {
  if (!isAuthenticated()) {
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