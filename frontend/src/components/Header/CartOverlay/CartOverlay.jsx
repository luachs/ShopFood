import React from "react";
import "./CartOverlay.css";

const CartOverlay = ({ onClose }) => {
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
        <li className="cart-overlay-item">
          <span className="item-name">🥤 Trà sữa - 2 ly</span>
          <div className="item-controls">
            <button className="control-btn">+</button>
            <span className="item-quantity">8</span>
            <button className="control-btn">-</button>
            <button className="remove-btn">x</button>
          </div>
        </li>
        <li className="cart-overlay-item">
          <span className="item-name">🥤 Trà sữa - 2 ly</span>
          <div className="item-controls">
            <button className="control-btn">+</button>
            <span className="item-quantity">8</span>
            <button className="control-btn">-</button>
            <button className="remove-btn">x</button>
          </div>
        </li>
        <li className="cart-overlay-item">
          <span className="item-name">🥤 Trà sữa - 2 ly</span>
          <div className="item-controls">
            <button className="control-btn">+</button>
            <span className="item-quantity">8</span>
            <button className="control-btn">-</button>
            <button className="remove-btn">x</button>
          </div>
        </li>
        <li className="cart-overlay-item">
          <span className="item-name">🥤 Trà sữa - 2 ly</span>
          <div className="item-controls">
            <button className="control-btn">+</button>
            <span className="item-quantity">8</span>
            <button className="control-btn">-</button>
            <button className="remove-btn">x</button>
          </div>
        </li>
        <li className="cart-overlay-item">
          <span className="item-name">🥤 Trà sữa - 2 ly</span>
          <div className="item-controls">
            <button className="control-btn">+</button>
            <span className="item-quantity">8</span>
            <button className="control-btn">-</button>
            <button className="remove-btn">x</button>
          </div>
        </li>
        <li className="cart-overlay-item">
          <span className="item-name">🥤 Trà sữa - 2 ly</span>
          <div className="item-controls">
            <button className="control-btn">+</button>
            <span className="item-quantity">8</span>
            <button className="control-btn">-</button>
            <button className="remove-btn">x</button>
          </div>
        </li>
        <li className="cart-overlay-item">
          <span className="item-name">🥤 Trà sữa - 2 ly</span>
          <div className="item-controls">
            <button className="control-btn">+</button>
            <span className="item-quantity">8</span>
            <button className="control-btn">-</button>
            <button className="remove-btn">x</button>
          </div>
        </li>
        <li className="cart-overlay-item">
          <span className="item-name">🥤 Trà sữa - 2 ly</span>
          <div className="item-controls">
            <button className="control-btn">+</button>
            <span className="item-quantity">8</span>
            <button className="control-btn">-</button>
            <button className="remove-btn">x</button>
          </div>
        </li>
        <li className="cart-overlay-item">
          <span className="item-name">🥤 Trà sữa - 2 ly</span>
          <div className="item-controls">
            <button className="control-btn">+</button>
            <span className="item-quantity">8</span>
            <button className="control-btn">-</button>
            <button className="remove-btn">x</button>
          </div>
        </li>
        <li className="cart-overlay-item">
          <span className="item-name">🥤 Trà sữa - 2 ly</span>
          <div className="item-controls">
            <button className="control-btn">+</button>
            <span className="item-quantity">8</span>
            <button className="control-btn">-</button>
            <button className="remove-btn">x</button>
          </div>
        </li>
        <li className="cart-overlay-item">
          <span className="item-name">🥤 Trà sữa - 2 ly</span>
          <div className="item-controls">
            <button className="control-btn">+</button>
            <span className="item-quantity">8</span>
            <button className="control-btn">-</button>
            <button className="remove-btn">x</button>
          </div>
        </li>
        <li className="cart-overlay-item">
          <span className="item-name">🥤 Trà sữa - 2 ly</span>
          <div className="item-controls">
            <button className="control-btn">+</button>
            <span className="item-quantity">8</span>
            <button className="control-btn">-</button>
            <button className="remove-btn">x</button>
          </div>
        </li>
        <li className="cart-overlay-item">
          <span className="item-name">🥤 Trà sữa - 2 ly</span>
          <div className="item-controls">
            <button className="control-btn">+</button>
            <span className="item-quantity">8</span>
            <button className="control-btn">-</button>
            <button className="remove-btn">x</button>
          </div>
        </li>
        <li className="cart-overlay-item">
          <span className="item-name">🥤 Trà sữa - 2 ly</span>
          <div className="item-controls">
            <button className="control-btn">+</button>
            <span className="item-quantity">8</span>
            <button className="control-btn">-</button>
            <button className="remove-btn">x</button>
          </div>
        </li>
        <li className="cart-overlay-item">
          <span className="item-name">🥤 Trà sữa - 2 ly</span>
          <div className="item-controls">
            <button className="control-btn">+</button>
            <span className="item-quantity">8</span>
            <button className="control-btn">-</button>
            <button className="remove-btn">x</button>
          </div>
        </li>
        <li className="cart-overlay-item">
          <span className="item-name">🥤 Trà sữa - 2 ly</span>
          <div className="item-controls">
            <button className="control-btn">+</button>
            <span className="item-quantity">8</span>
            <button className="control-btn">-</button>
            <button className="remove-btn">x</button>
          </div>
        </li>
      </div>
      <button className="checkout-btn">Thanh Toán</button>
    </div>
  );
};

export default CartOverlay;
