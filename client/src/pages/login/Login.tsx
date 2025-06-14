import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../../services/AuthServices";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role && !appContext?.auth.isAuthenticated) {
      appContext?.setAuthData(token, role);
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = credentials;

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await login(email, password);

      if (res.status === 200) {
        const { token, role } = res.data;

        // Save to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        // Update context
        appContext?.setAuthData(token, role);

        toast.success("Login successful!");
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark">
      <div className="container">
        <div>
          <h1 className="login-title">Welcome to SalesBill</h1>
          <p className="login-subtitle">Please log in to continue</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="your-email@example.com"
              className="login-input"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
        <div className="login-image">
          <img src={assets.loginImg} alt="login-img" width={500} height={500} />
        </div>
      </div>
    </div>
  );
};

export default Login;
