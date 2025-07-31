import React from "react";
import HeaderMenu from "../components/Menu/HeaderMenu/HeaderMenu";
import "./static/style.css";
import MenuProducts from "../components/Menu/MenuProducts/MenuProducts";
const Menu = () => {
  return (
    <div className="page-menu">
      <HeaderMenu />
      <MenuProducts />
    </div>
  );
};

export default Menu;
