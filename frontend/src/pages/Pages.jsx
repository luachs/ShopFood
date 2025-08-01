import React from "react";
import HeaderPages from "../components/Pages/HeaderPages/HeaderPages";
import ListPages from "../components/Pages/ListPages/ListPages";

const Pages = () => {
  return (
    <div className="container page-pages">
      <HeaderPages />
      <ListPages />
    </div>
  );
};

export default Pages;
