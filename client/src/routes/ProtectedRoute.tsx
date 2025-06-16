import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { useAppContext } from "../hooks/useAppContext";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const navigate = useNavigate();
  const { auth, setAuthData } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      navigate("/login", { replace: true });
      return;
    }

    if (!auth.token || !auth.role) {
      setAuthData(token, role);
    }

    setTimeout(() => {
      if (allowedRoles && !allowedRoles.includes(role)) {
        navigate("/dashboard", { replace: true });
      } else {
        setLoading(false);
      }
    }, 200);
  }, [navigate, allowedRoles, auth.token, auth.role, setAuthData]);

  if (loading) return <Loader />;

  return <Outlet />;
};

export default ProtectedRoute;
