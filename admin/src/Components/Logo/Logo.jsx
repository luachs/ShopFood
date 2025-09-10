import React from "react";
import logo from "../../assets/Logo.png";
import "./Logo.css";

const Logo = ({ light = false }) => {
  return (
    <div className="logo">
      <img className="logo-img" src={logo} alt="Logo" />
      <div className={`logo-text ${light ? "light" : "dark"}`}>
        Bistro bliss
        <p className="admin-panel">Admin Panel</p>
      </div>
    </div>
  );
};

export default Logo;
