import React, { useEffect, useState } from "react";
import CartItem from "@/components/CartItem/CartItem";
import "./MenuProducts.css";

import { useMenu } from "@/contexts/MenuContext";
import { useCart } from "@/contexts/CartContext";

import productApi from "@/api/productsApi";
import { Link } from "react-router-dom";
import config from "@/config/config";

const MenuProducts = ({ setPagination, page }) => {
  const [products, setProduct] = useState([]);

  const { selectedCategory } = useMenu();
  const { addItem } = useCart();

  const fetchData = async () => {
    const res = await productApi.getPaginated(page, 6, "id", "desc");
    console.log(res.data.data);
    setPagination(res.data.pagination);
    setProduct(res.data.data);
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category?.name === selectedCategory);

  return (
    <div className="menu-products">
      {filtered.map((item, index) => (
        <Link
          to={`${config.routes.products}/${item.id}`}
          data-aos="fade up"
          key={index}
          className="menu-products-items"
        >
          <CartItem
            id={item._id}
            product
            medium
            onAddToCart={addItem}
            img={item.image}
            price={item.price}
            title={item.name}
            desc={item.description}
          />
        </Link>
      ))}
    </div>
  );
};

export default MenuProducts;
