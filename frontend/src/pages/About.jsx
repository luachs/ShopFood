import React from "react";
import VisitUsCard from "../components/VisitUsCard/VisitUsCard.jsx";
import OurCustomers from "../components/OurCustomers/OurCustomers.jsx";
import VideoIntroduce from "../components/About/VideoIntroduce/VideoIntroduce.jsx";

import CardImages from "../components/assets/images/VisitUsCard/VisitUsCard2.png";
const About = () => {
  return (
    <div className="container about">
      <VisitUsCard image={CardImages} />
      <VideoIntroduce />
      <OurCustomers />
    </div>
  );
};

export default About;
