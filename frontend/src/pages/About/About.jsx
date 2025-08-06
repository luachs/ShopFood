import React from "react";
import VisitUsCard from "@/components/VisitUsCard/VisitUsCard.jsx";
import OurCustomers from "@/components/OurCustomers/OurCustomers.jsx";
import VideoIntroduce from "./components/VideoIntroduce/VideoIntroduce.jsx";
import IntroStats from "./components/IntroStats/IntroStats.jsx";

import CardImages from "@/assets/images/VisitUsCard/VisitUsCard2.png";
const About = () => {
  return (
    <div className="container page-about">
      <VisitUsCard image={CardImages} />
      <VideoIntroduce />
      <IntroStats />
      <OurCustomers />
    </div>
  );
};

export default About;
