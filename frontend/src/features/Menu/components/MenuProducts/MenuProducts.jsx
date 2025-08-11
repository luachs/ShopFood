import React, { useEffect, useState } from "react";
import CartItem from "@/components/CartItem/CartItem";
import "./MenuProducts.css";

import { fetProducts } from "@/api/productApi";
import { useMenu } from "@/contexts/MenuContext";
import { useCart } from "@/hooks/useCart";

const MenuProducts = () => {
  const [products, setProduct] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);

  const { selectedCategory } = useMenu();
  const { addItem } = useCart();

  useEffect(() => {
    fetProducts().then((data) => {
      setProduct(data);
      setIsLoading(false);
    });
  }, []);

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="menu-products">
      {filtered.map((item, index) => (
        <div data-aos="fade up" key={index} className="menu-products-items">
          <CartItem
            id={item.id}
            product
            medium
            onAddToCart={addItem}
            img={item.img}
            price={item.price}
            title={item.title}
            desc={
              "Made with eggs, lettuce, salt, oil and other ingredients .ade with eggs, lettuce, salt, oil and other ingredients "
            }
          />
        </div>
      ))}
    </div>
  );
};

export default MenuProducts;
