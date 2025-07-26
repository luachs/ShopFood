import React from "react";
import "./static/style.css";

import Hero from "../components/home/Hero/Hero.jsx";
import OurMenu from "../components/home/OurMenu/OurMenu.jsx";
import VisitUsCard from "../components/home/VisitUsCard/VisitUsCard.jsx";
import EventService from "../components/home/EventService/EventService.jsx";
import DeliveryFood from "../components/home/DeliveryFood/DeliveryFood.jsx";
import OurCustomers from "../components/home/OurCustomers/OurCustomers.jsx";
import OurBlog from "../components/home/OurBlog/OurBlog.jsx";

const Home = () => {
  return (
    <div className="container home">
      <Hero />
      <OurMenu />
      <VisitUsCard />
      <EventService />
      <DeliveryFood />
      <OurCustomers />
      <OurBlog />
    </div>
  );
};

export default Home;
