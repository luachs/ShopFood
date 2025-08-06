import React from "react";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import "@/Styles/global.css";
import MenuProducts from "../components/MenuProducts/MenuProducts";
import OrderViaApp from "../components/OrderViaApp/OrderViaApp";

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
