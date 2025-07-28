import React from "react";
import "./CartItem.css";

const CartItem = ({ img, date, title, desc, large = false }) => {
  let classesCardItem = "cart-item";

  if (large) {
    classesCardItem += " large";
  }

  return (
    <div className={classesCardItem}>
      <img src={img} />
      <div className="cart-content">
        <p className="cart-date">{date}</p>
        <h3 className="cart-title">{title}</h3>
        {large && <p className="cart-desc">{desc}</p>}
      </div>
    </div>
  );
};

export default CartItem;
