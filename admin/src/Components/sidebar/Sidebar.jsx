import React, { useState } from "react";
import "./Sidebar.css";

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const [active, setActive] = useState(
    location.pathname === "/" ? "/addproduct" : location.pathname
  );

  const handleActive = (path) => {
    setActive(path);
  };
  return (
    <div className="sidebar">
      <Link
        className={`sidebar-btn ${active === "/addproduct" ? "active" : ""}`}
        to="/addproduct"
        onClick={() => handleActive("/addproduct")}
      >
        Add product
      </Link>
      <Link
        className={`sidebar-btn ${active === "/listproduct" ? "active" : ""}`}
        to="/listproduct"
        onClick={() => handleActive("/listproduct")}
      >
        List Product
      </Link>
      <Link
        className={`sidebar-btn ${active === "/addcategory" ? "active" : ""}`}
        to="/addcategory"
        onClick={() => handleActive("/addcategory")}
      >
        Add Category
      </Link>
      <Link
        className={`sidebar-btn ${active === "/listcategory" ? "active" : ""}`}
        to="/listcategory"
        onClick={() => handleActive("/listcategory")}
      >
        List Category
      </Link>
    </div>
  );
};

export default Sidebar;
