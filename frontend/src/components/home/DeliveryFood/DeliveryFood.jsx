import React from "react";
import "./DeliveryFood.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faTag,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import imgBig from "../../assets/images/DeliveryFood/imgBig.png";
import imgSmall1 from "../../assets/images/DeliveryFood/imgSmall1.png";
import imgSmall2 from "../../assets/images/DeliveryFood/imgSmall2.png";

const serviceFeatures = [
  {
    icon: faClock, // hoặc "fa-clock"
    text: "Delivery within 30 minutes",
  },
  {
    icon: faTag, // hoặc "fa-tags"
    text: "Best Offer & Prices",
  },
  {
    icon: faCartShopping,
    text: "Online Services Available",
  },
];

const DeliveryFood = () => {
  return (
    <div className="delivery-food">
      <div className="delivery-food-imgs" data-aos="fade-up">
        <img src={imgBig} alt="" className="img-large" />
        <div className="list-img-small">
          <img src={imgSmall1} alt="" />
          <img src={imgSmall2} alt="" />
        </div>
      </div>
      <div className="delivery-food-content" data-aos="fade-up">
        <h1>Fastest Food Delivery in City</h1>
        <p>
          Our visual designer lets you quickly and of drag a down your way to
          customapps for both keep desktop.{" "}
        </p>
        <div className="service-items">
          {serviceFeatures.map((item, index) => {
            return (
              <div key={index} className="service-item">
                <FontAwesomeIcon icon={item.icon} className="service-icon" />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DeliveryFood;
