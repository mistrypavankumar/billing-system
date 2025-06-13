import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";

import MenuBar from "./components/menubar/MenuBar";
import Dashboard from "./pages/dashboard/Dashboard";
import Explore from "./pages/explore/Explore";
import ManageCategories from "./pages/manageCategories/ManageCategories";
import ManageItems from "./pages/manageItems/ManageItems";
import ManageUsers from "./pages/manageUsers/ManageUsers";
import Login from "./pages/login/Login";

import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const location = useLocation();
  const hideMenu = location.pathname === "/login";

  return (
    <div>
      {!hideMenu && <MenuBar />}
      <Toaster />

      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/manage/categories" element={<ManageCategories />} />
          <Route path="/manage/items" element={<ManageItems />} />
          <Route path="/manage/users" element={<ManageUsers />} />
        </Route>

        {/* Catch-all route (404 redirect) */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default App;
