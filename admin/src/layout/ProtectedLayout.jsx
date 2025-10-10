import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/sidebar/Sidebar";
import AdminRoute from "../Components/AdminRoute/AdminRoute";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <AdminRoute>
      <div className="container-app">
        <Navbar />
        <div className="wrapper-app">
          <Sidebar />
          <div className="content-app">
            {/* 👇 Outlet sẽ render route con */}
            <Outlet />
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default ProtectedLayout;
