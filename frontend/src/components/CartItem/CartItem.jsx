import React from "react";
import "./CartItem.css";

const CartItem = ({
  img,
  date,
  title,
  desc,
  large = false,
  cost,
  product = false,
  medium = false,
}) => {
  let classesCardItem = "cart-item";

  if (large) {
    classesCardItem += " large";
  }
  if(medium){
     classesCardItem += " medium";
  }
  if (product) {
    classesCardItem += " product";
  }

  return (
    <div className={classesCardItem}>
      <img src={img} />
      <div className="cart-content ">
        <p className="cart-date">{date}</p>
        <div className="cart-cost "> {cost}</div>
        <h3 className="cart-title ">{title}</h3>
        {large && <p className="cart-desc ">{desc}</p>}
        {product && <p className="cart-desc ">{desc}</p>}
      </div>
    </div>
  );
};

export default CartItem;
