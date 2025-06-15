import "./MenuBar.css";
import "../../assets/assets.js";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

const MenuBar = () => {
  const navigation = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect to login page after logout
    navigation("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
      <Link className="navbar-brand" to="#">
        <img src={assets.logo} alt="Logo" height="40" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse p-2" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/explore">
              Explore
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/manage/items">
              Manage Items
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/manage/categories">
              Manage Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/manage/users">
              Manage Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/manage/orders">
              Order History
            </Link>
          </li>
        </ul>
        {/* Add the dropdown for user profile */}
        <ul className="navbar-nav ms-auto ms-mb-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={assets.profile} alt="profile" height={32} width={32} />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a href="#!" className="dropdown-item">
                  Settings
                </a>
              </li>
              <li>
                <a href="#!" className="dropdown-item">
                  Activity log
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a href="#!" className="dropdown-item" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuBar;
