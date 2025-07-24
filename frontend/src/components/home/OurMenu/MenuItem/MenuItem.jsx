import React from "react";
import "./MenuItem.css";
const MenuItem = (props) => {
  return (
    <div className="menu-item">
      <div className="menu-item-img">
        <img src={props.image} alt="" />
      </div>
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <h3 className="explore-menu">Explore Menu</h3>
    </div>
  );
};

export default MenuItem;
