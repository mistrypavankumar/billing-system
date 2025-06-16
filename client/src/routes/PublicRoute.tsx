import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

const PublicRoute = () => {
  const { auth } = useAppContext();

  return auth.isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
