import React from "react";
import "./CartOverlay.css";
import CartOverlayItem from "./CartOverlayItem/CartOverlayItem";
import { useCart } from "../../../hooks/useCart";

const CartOverlay = ({ onClose }) => {
  const { items, increaseQuantity, decreaseQuantity, removeItem } = useCart();

  const handleClickInside = (e) => {
    e.stopPropagation(); // ⚠️ Ngăn click lan lên cha
  };
  return (
    <div className="cart-overlay-fixed" onClick={handleClickInside}>
      <button className="close-btn" onClick={onClose}>
        ❌
      </button>
      <h3>Giỏ hàng của bạn</h3>
      <div className="cart-overlay-items">
        {items.map((item) => {
          return (
            <CartOverlayItem
              img={item.img}
              key={item.id}
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeItem}
            />
          );
        })}
      </div>
      <button className="checkout-btn">Thanh Toán</button>
    </div>
  );
};

export default CartOverlay;
