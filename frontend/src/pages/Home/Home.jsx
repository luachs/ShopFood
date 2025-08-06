import React from "react";
import "@/Styles/global.css";

import VisitUsCard from "@/components/VisitUsCard/VisitUsCard.jsx";
import OurCustomers from "@/components/OurCustomers/OurCustomers.jsx";
import Hero from "./components/Hero/Hero.jsx";
import OurMenu from "./components/OurMenu/OurMenu.jsx";
import EventService from "./components/EventService/EventService.jsx";
import DeliveryFood from "./components/DeliveryFood/DeliveryFood.jsx";
import OurBlog from "./components/OurBlog/OurBlog.jsx";

import CardImages from "@/assets/images/VisitUsCard/VisitUsCard1.png";

const Home = () => {
  return (
    <div className="container page-home">
      <Hero />
      <OurMenu />
      <VisitUsCard image={CardImages} />
      <EventService />
      <DeliveryFood />
      <OurCustomers />
      <OurBlog />
    </div>
  );
};

export default Home;
