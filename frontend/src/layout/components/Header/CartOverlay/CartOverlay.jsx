import React from "react";
import "./CartOverlay.css";
import CartOverlayItem from "./CartOverlayItem/CartOverlayItem";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import config from "@/config/config";
import { formatCurrency } from "@/utils/FormatCurrency";

const CartOverlay = ({ onClose }) => {
  const { items, increaseQuantity, decreaseQuantity, removeItem, totalPrice } =
    useCart();

  const handleClickInside = (e) => {
    e.stopPropagation(); // ⚠️ Ngăn click lan lên cha
  };

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
              const product = item.product;
              return (
                <CartOverlayItem
                  key={product._id}
                  id={product._id}
                  img={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={item.quantity}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onRemove={removeItem}
                />
              );
            })}
          </div>
          <div>Tổng đơn hàng của bạn : {totalPrice} VNĐ</div>
          <Link
            onClick={onClose}
            className="checkout-btn"
            to={config.routes.checkout}>
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
