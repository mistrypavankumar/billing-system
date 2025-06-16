import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";

import MenuBar from "./components/menubar/MenuBar";
import Dashboard from "./pages/dashboard/Dashboard";
import Explore from "./pages/explore/Explore";
import ManageCategories from "./pages/manageCategories/ManageCategories";
import ManageItems from "./pages/manageItems/ManageItems";
import ManageUsers from "./pages/manageUsers/ManageUsers";
import Login from "./pages/login/Login";
import OrderHistory from "./components/orderHistory/OrderHistory";

import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  const location = useLocation();
  const hideMenu = location.pathname === "/login";

  return (
    <div>
      {!hideMenu && <MenuBar />}
      <Toaster />

      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Authenticated Routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_USER"]} />
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/manage/orders" element={<OrderHistory />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
          <Route path="/manage/categories" element={<ManageCategories />} />
          <Route path="/manage/items" element={<ManageItems />} />
          <Route path="/manage/users" element={<ManageUsers />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default App;
