import React, { useState } from "react";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import "@/Styles/global.css";
import MenuProducts from "../components/MenuProducts/MenuProducts";
import OrderViaApp from "../components/OrderViaApp/OrderViaApp";
import Pagination from "@/components/Pagination/Pagination";

const Menu = () => {
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  return (
    <div className="page-menu">
      <HeaderMenu />
      <MenuProducts setPagination={setPagination} page={page} />
      <Pagination page={page} setPage={setPage} pagination={pagination} />
      <OrderViaApp />
    </div>
  );
};

export default Menu;
