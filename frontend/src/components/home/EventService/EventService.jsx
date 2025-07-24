import React from "react";
import "./EventService.css";
import Caterings from "../../assets/images/EventService/Caterings.png";
import Birthdays from "../../assets/images/EventService/Birthdays.png";
import Weddings from "../../assets/images/EventService/Weddings.png";
import Events from "../../assets/images/EventService/Events.png";

const cartEvent = [
  {
    img: Caterings,
    name: "Caterings",
    desc: "In the new era of technology we look in the future with certainty for life.",
  },
  {
    img: Birthdays,
    name: "Birthdays",
    desc: "In the new era of technology we look in the future with certainty for life.",
  },
  {
    img: Weddings,
    name: "Weddings",
    desc: "In the new era of technology we look in the future with certainty for life.",
  },
  {
    img: Events,
    name: "Events",
    desc: "In the new era of technology we look in the future with certainty for life.",
  },
];
const EventService = () => {
  return (
    <div className="event-service">
      <h1>We also offer unique services for your events</h1>
      <div className="cart-items">
        {cartEvent.map((item, index) => (
          <div key={index} className="card-event">
            <img src={item.img} alt="" />
            <h3>{item.name}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventService;
