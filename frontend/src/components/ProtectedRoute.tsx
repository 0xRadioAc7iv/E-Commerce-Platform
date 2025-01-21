import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store";

const ProtectedRoutes = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
