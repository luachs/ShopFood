import React from "react";
import Header from "@/layout/components/Header/Header";
import Sidebar from "@/layout/components/Sidebar/Sidebar";
import "./DefaultLayout.css";
import Footer from "@/layout/components/Footer/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
