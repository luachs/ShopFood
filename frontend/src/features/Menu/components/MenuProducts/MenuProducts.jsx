import React, { useEffect, useState } from "react";
import CartItem from "@/components/CartItem/CartItem";
import "./MenuProducts.css";

import { fetProducts } from "@/api/productApi";
import { useMenu } from "@/contexts/MenuContext";
import { useCart } from "@/hooks/useCart";
import productApi from "@/api/productsApi";

const MenuProducts = () => {
  const [products, setProduct] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);

  const { selectedCategory } = useMenu();
  const { addItem } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const res = await productApi.getAll();
      console.log(res.data);
      setProduct(res.data);
    };
    fetchData();
  }, []);

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category?.name === selectedCategory);

  return (
    <div className="menu-products">
      {filtered.map((item, index) => (
        <div data-aos="fade up" key={index} className="menu-products-items">
          <CartItem
            id={item.id}
            product
            medium
            onAddToCart={addItem}
            img={item.image}
            price={item.price}
            title={item.title}
            desc={item.description}
          />
        </div>
      ))}
    </div>
  );
};

export default MenuProducts;
