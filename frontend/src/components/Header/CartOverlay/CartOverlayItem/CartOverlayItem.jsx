import React from "react";
import "./CartOverlayItem.css";

const CartOverlayItem = ({
  img,
  id,
  name,
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
