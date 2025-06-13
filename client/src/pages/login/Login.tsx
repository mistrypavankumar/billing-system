import { useContext, useState } from "react";
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
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = state;

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await login(email, password);

      if (res.status === 200) {
        toast.success("Login successful!");

        const { token, role } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        appContext?.setAuthData(token, role);

        // Navigate to dashboard after auth
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
          <form className="login-form" onSubmit={onSubmitHandler}>
            <input
              type="email"
              placeholder="your-email@example.com"
              className="login-input"
              name="email"
              value={state.email}
              onChange={onChangeHandler}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              name="password"
              value={state.password}
              onChange={onChangeHandler}
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
