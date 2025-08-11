import React from "react";
import logo from "@/assets/logo/Logo.png";
import "./Logo.css";

const Logo = ({ light = false }) => {
  return (
    <div className="logo">
      <img className="logo-img" src={logo} alt="Logo" />
      <div className={`logo-text ${light ? "light" : "dark"}`}>
        Bistro bliss
      </div>
    </div>
  );
};

export default Logo;
