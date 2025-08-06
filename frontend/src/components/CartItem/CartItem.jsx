import React from "react";
import "./CartItem.css";
import Button from "@/components/Button/Button";

const CartItem = ({
  id,
  img,
  date,
  title,
  desc,
  large = false,
  cost,
  onAddToCart,
  product = false,
  medium = false,
}) => {
  let classesCardItem = "cart-item";

  if (large) {
    classesCardItem += " large";
  }
  if (medium) {
    classesCardItem += " medium";
  }
  if (product) {
    classesCardItem += " product";
  }
  const handleAdd = () => {
    onAddToCart({ id, name: title, img: img });
    alert("Thêm vào giỏ hàng thành công!");
  };
  return (
    <div className={classesCardItem}>
      <div className="cart-img-wrapper">
        <img src={img} alt={title} />
        {product && (
          <div className="cart-overlay">
            <Button primary onClick={handleAdd}>
              🛒 Add to cart
            </Button>
          </div>
        )}
      </div>
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
