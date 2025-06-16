import "./MenuBar.css";
import "../../assets/assets.js";
import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuLinksData } from "../../utils/constant.js";
import { useAppContext } from "../../hooks/useAppContext.js";

const MenuBar = () => {
  const { auth, setAuthData } = useAppContext();

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    // Clear auth state & localStorage in one call
    setAuthData(null, null);

    // Wait a tick to ensure context updates before navigation
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 50);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isAdmin = auth.role === "ROLE_ADMIN";

  const fileteredMenuLinks = MenuLinksData.filter(
    (menu) => menu.isAdmin === isAdmin || !menu.isAdmin
  );

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
          {fileteredMenuLinks.map((menu) => {
            return (
              <NavLink
                key={menu.path}
                isActive={isActive}
                path={menu.path}
                label={menu.label}
              />
            );
          })}
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

const NavLink = ({
  isActive,
  path,
  label,
}: {
  isActive: (path: string) => boolean;
  path: string;
  label: string;
}) => {
  return (
    <li className="nav-item">
      <Link
        className={`nav-link ${isActive(path) ? "fw-bold text-warning" : ""}`}
        to={path}
      >
        {label}
      </Link>
    </li>
  );
};