import React from "react";
import "./MenuItem.css";
import { Link } from "react-router-dom";
import config from "@/config/config";
const MenuItem = (props) => {
  return (
    <div className="menu-item ">
      <div className="menu-item-img">
        <img src={props.image} alt="" />
      </div>
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <Link to={config.routes.menu}>
        <h3 className="explore-menu">Explore Menu</h3>
      </Link>
    </div>
  );
};

export default MenuItem;
