// routes/PublicOnlyRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth.store.ts";

export default function PublicOnlyRoute() {
  const user = useAuth((s) => s.currentUser);
  return user ? <Navigate to="/" replace /> : <Outlet />;
}
