import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loader from "../components/loader/Loader";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      navigate("/login", { replace: true });
      return;
    }

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [navigate, appContext]);

  if (loading) {
    return <Loader />;
  }

  if (!appContext?.auth.isAuthenticated) {
    navigate("/login", { replace: true });
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
