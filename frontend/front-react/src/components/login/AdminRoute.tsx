import { Navigate, Outlet } from "react-router-dom";
import { useRole } from "../../hooks/useRole";

export default function AdminRoute() {
  const role = useRole();

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}