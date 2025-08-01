import React from "react";
import VisitUsCard from "../components/VisitUsCard/VisitUsCard.jsx";
import OurCustomers from "../components/OurCustomers/OurCustomers.jsx";
import VideoIntroduce from "../components/About/VideoIntroduce/VideoIntroduce.jsx";

import CardImages from "../components/assets/images/VisitUsCard/VisitUsCard2.png";
import IntroStats from "../components/About/IntroStats/IntroStats.jsx";
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
