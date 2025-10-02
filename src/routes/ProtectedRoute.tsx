import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth.store.ts";

export default function ProtectedRoute() {
  const user = useAuth((s) => s.currentUser);
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
