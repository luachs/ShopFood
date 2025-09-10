import React from "react";
import "./Navbar.css";
import Logo from "../Logo/Logo";

import avatar from "../../assets/Killua.jpg";

const Navbar = () => {
  return (
    <div className="container-navbar">
      <div className="navbar">
        <Logo />
        <img src={avatar} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
