import React from "react";
import HeaderMenu from "../components/Menu/HeaderMenu/HeaderMenu";
import "./static/style.css";
import MenuProducts from "../components/Menu/MenuProducts/MenuProducts";
import OrderViaApp from "../components/Menu/OrderViaApp/OrderViaApp";
const Menu = () => {
  return (
    <div className="page-menu">
      <HeaderMenu />
      <MenuProducts />
      <OrderViaApp />
    </div>
  );
};

export default Menu;
