import { Route, Routes } from "react-router-dom";
import "./App.css";
import MenuBar from "./components/menubar/MenuBar";
import Dashboard from "./pages/dashboard/Dashboard";
import Explore from "./pages/explore/Explore";
import ManageCategories from "./pages/manageCategories/ManageCategories";
import ManageItems from "./pages/manageItems/ManageItems";
import ManageUsers from "./pages/manageUsers/ManageUsers";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <MenuBar />
      <Toaster />

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/manage/categories" element={<ManageCategories />} />
        <Route path="/manage/items" element={<ManageItems />} />
        <Route path="/manage/users" element={<ManageUsers />} />
      </Routes>
    </div>
  );
}

export default App;
