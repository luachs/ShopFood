import React from "react";
import "./VisitUsCard.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import CardImages from "../../assets/images/VisitUsCard/VisitUsCard.png";
import Button from "../../Button/Button";

const CartContact = [
  {
    icon: <FontAwesomeIcon icon={faPhone} />,
    desc: "(414) 857 - 0107",
  },
  {
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    desc: "happytummy@restaurant.com",
  },
  {
    icon: <FontAwesomeIcon icon={faLocationDot} />,
    desc: "837 W. Marshall Lane Marshalltown, IA 50158, Los Angeles",
  },
];
const VisitUsCard = () => {
  return (
    <div className="visit-us-card">
      <div className="visit-cart-left" data-aos="fade-right">
        <img src={CardImages} alt="" />
        <div className="cart-contact">
          <div className="title">Come and visit us</div>
          {CartContact.map((item, index) => (
            <div key={index} className="contact-item">
              <span className="icon">{item.icon}</span>
              <span className="desc">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="visit-card-right" data-aos="fade-left">
        <h1 className="title">We provide healthy food for your family.</h1>
        <p className="desc1">
          Our story began with a vision to create a unique dining experience
          that merges fine dining, exceptional service, and a vibrant ambiance.
          Rooted in city's rich culinary culture, we aim to honor our local
          roots while infusing a global palate.
        </p>
        <p className="desc2">
          At place, we believe that dining is not just about food, but also
          about the overall experience. Our staff, renowned for their warmth and
          dedication, strives to make every visit an unforgettable event.
        </p>
        <Button outline>More About Us</Button>
      </div>
    </div>
  );
};

export default VisitUsCard;
