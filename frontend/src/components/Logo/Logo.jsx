import React from "react";

import logo from "@/assets/logo/Logo.png";

const Logo = ({ light = false }) => {
  const logoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const nameLogoStyle = {
    fontFamily: "'Playfair Display', serif",
    fontSize: "22px",
    color: light ? "#fff" : "black",
  };

  return (
    <div style={logoStyle}>
      <img src={logo} alt="Logo" />
      <div style={nameLogoStyle} className={light ? "" : "dark-mode"}>
        Bistro bliss
      </div>
    </div>
  );
};

export default Logo;
