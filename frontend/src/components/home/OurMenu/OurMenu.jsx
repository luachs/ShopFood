import React from "react";
import "./OurMenu.css";
import Breakfast from "../../assets/images/OurMenu/Breakfast.png";
import Desserts from "../../assets/images/OurMenu/Desserts.png";
import Drinks from "../../assets/images/OurMenu/Drinks.png";
import MainDishes from "../../assets/images/OurMenu/MainDishes.png";

import MenuItem from "./MenuItem/MenuItem";

const OurMenus = [
  {
    name: "Breakfast",
    image: Breakfast,
    description:
      "In the new era of technology we look in the future with certainty and pride for our life.",
  },
  {
    name: "Desserts",
    image: Desserts,
    description:
      "In the new era of technology we look in the future with certainty and pride for our life.",
  },
  {
    name: "Drinks",
    image: Drinks,
    description:
      "In the new era of technology we look in the future with certainty and pride for our life.",
  },
  {
    name: "MainDishes",
    image: MainDishes,
    description:
      "In the new era of technology we look in the future with certainty and pride for our life.",
  },
];
const OurMenu = () => {
  return (
    <div className="our-menu">
      <h1 className="menu-title">Browse Our Menu</h1>
      <div className="menu-items">
        {OurMenus.map((item, index) => (
          <MenuItem
            key={index}
            image={item.image}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default OurMenu;
