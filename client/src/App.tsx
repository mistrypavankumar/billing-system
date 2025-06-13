import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import MenuBar from "./components/menubar/MenuBar";
import Dashboard from "./pages/dashboard/Dashboard";
import Explore from "./pages/explore/Explore";
import ManageCategories from "./pages/manageCategories/ManageCategories";
import ManageItems from "./pages/manageItems/ManageItems";
import ManageUsers from "./pages/manageUsers/ManageUsers";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/Login";

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/login" && <MenuBar />}
      <Toaster />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/manage/categories" element={<ManageCategories />} />
        <Route path="/manage/items" element={<ManageItems />} />
        <Route path="/manage/users" element={<ManageUsers />} />
      </Routes>
    </div>
  );
}

export default App;
