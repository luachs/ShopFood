import React from "react";
import "./CartOverlayItem.css";
import { formatCurrency } from "@/utils/FormatCurrency";

const CartOverlayItem = ({
  img,
  id,
  name,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className="cart-overlay-item">
      <div className="item-info">
        <img src={img} alt="" className="cart-overlay-img" />
        <span className="item-name">{name}</span>
      </div>
      <div className="item-price">{formatCurrency(price, "en-US", "USD")}</div>
      <div className="item-controls">
        <button className="control-btn" onClick={() => onDecrease(id)}>
          -
        </button>
        <span className="item-quantity">{quantity}</span>
        <button className="control-btn" onClick={() => onIncrease(id)}>
          +
        </button>
        <button className="remove-btn" onClick={() => onRemove(id)}>
          x
        </button>
      </div>
    </div>
  );
};

export default CartOverlayItem;
