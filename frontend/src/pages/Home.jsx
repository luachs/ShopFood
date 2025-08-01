import React from "react";
import "./static/style.css";

import Hero from "../components/home/Hero/Hero.jsx";
import OurMenu from "../components/home/OurMenu/OurMenu.jsx";
import VisitUsCard from "../components/VisitUsCard/VisitUsCard.jsx";
import EventService from "../components/home/EventService/EventService.jsx";
import DeliveryFood from "../components/home/DeliveryFood/DeliveryFood.jsx";
import OurCustomers from "../components/OurCustomers/OurCustomers.jsx";
import OurBlog from "../components/home/OurBlog/OurBlog.jsx";

import CardImages from "../components/assets/images/VisitUsCard/VisitUsCard1.png";

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
