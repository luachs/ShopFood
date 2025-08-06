import React from "react";
import "./CartOverlay.css";
import CartOverlayItem from "./CartOverlayItem/CartOverlayItem";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import config from "@/config/config";

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
      <Link
        onClick={onClose}
        className="checkout-btn"
        to={config.routes.checkout}
      >
        <button>Thanh Toán</button>
      </Link>
    </div>
  );
};

export default CartOverlay;
