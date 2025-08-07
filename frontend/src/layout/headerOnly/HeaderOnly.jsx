import React from "react";
import "./HeaderOnly.css";
import Header from "@/layout/components/Header/Header";
import Footer from "@/layout/components/Footer/Footer";

const HeaderOnly = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default HeaderOnly;
