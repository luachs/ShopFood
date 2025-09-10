import React from "react";
import "./Sidebar.css";

import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link className="sidebar-btn" to="/addproduct">
        Add product
      </Link>
      <Link className="sidebar-btn" to="/listproduct">
        List Product
      </Link>
    </div>
  );
};

export default Sidebar;
