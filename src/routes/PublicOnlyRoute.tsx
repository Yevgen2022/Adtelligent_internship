// routes/PublicOnlyRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth.store";

export default function PublicOnlyRoute() {
  const user = useAuth((s) => s.currentUser);
  return user ? <Navigate to="/" replace /> : <Outlet />;
}
