import React from "react";
import "./CartOverlay.css";
import CartOverlayItem from "./CartOverlayItem/CartOverlayItem";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import config from "@/config/config";
import { formatCurrency } from "@/utils/FormatCurrency";

const CartOverlay = ({ onClose }) => {
  const { items, increaseQuantity, decreaseQuantity, removeItem, totalPrice } =
    useCart();

  const handleClickInside = (e) => {
    e.stopPropagation(); // ⚠️ Ngăn click lan lên cha
  };
  if (!handleClickInside) {
    onClose();
  }
  return (
    <div className="cart-overlay-fixed" onClick={handleClickInside}>
      <button className="close-btn" onClick={onClose}>
        ❌
      </button>
      <h3>Giỏ hàng của bạn</h3>

      {totalPrice > 0 ? (
        <>
          <div className="cart-overlay-items">
            {items.map((item) => {
              return (
                <CartOverlayItem
                  price={item.price}
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
          <div>
            Tổng đơn hàng của bạn : {formatCurrency(totalPrice, "en-US", "USD")}
          </div>
          <Link
            onClick={onClose}
            className="checkout-btn"
            to={config.routes.checkout}
          >
            <button>Thanh Toán</button>
          </Link>
        </>
      ) : (
        <div className="not-product-cart">🛒 Giỏ hàng chưa có sản phẩm</div>
      )}
    </div>
  );
};

export default CartOverlay;
