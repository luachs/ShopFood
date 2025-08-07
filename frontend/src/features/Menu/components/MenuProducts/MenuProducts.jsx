import React from "react";
import CartItem from "@/components/CartItem/CartItem";
import "./MenuProducts.css";

import FriedEggs from "@/assets/images/Products/FriedEggs.png";
import HawaiianPizza from "@/assets/images/Products/HawaiianPizza.png";
import MartinezCocktail from "@/assets/images/Products/MartinezCocktail.png";
import ButterscotchCake from "@/assets/images/Products/ButterscotchCake.png";
import { useMenu } from "@/contexts/MenuContext";
import { useCart } from "@/hooks/useCart";

const Products = [
  {
    id: 1,
    img: FriedEggs,
    price: 10.0,
    title: "Pizza",
    category: "Breakfast",
    desc: "Made with eggs, lettuce, salt, oil and other ingredients .ade with eggs, lettuce, salt, oil and other ingredients ",
  },
  {
    id: 2,
    img: HawaiianPizza,
    price: 15.0,
    title: "Cheesecake",
    category: "Main Dishes",
    desc: "Made with eggs, lettuce, salt, oil and other ingredients .ade with eggs, lettuce, salt, oil and other ingredients ",
  },
  {
    id: 3,
    img: ButterscotchCake,
    price: 20.0,
    title: "Fried Eggs",
    category: "Dessert",
    desc: "Made with eggs, lettuce, salt, oil and other ingredients .ade with eggs, lettuce, salt, oil and other ingredients ",
  },
  {
    id: 4,
    img: MartinezCocktail,
    price: 17.0,
    title: "Cocktail",
    category: "Drinks",
    desc: "Made with eggs, lettuce, salt, oil and other ingredients .ade with eggs, lettuce, salt, oil and other ingredients ",
  },
];

const MenuProducts = () => {
  const { selectedCategory } = useMenu();
  const { addItem } = useCart();

  const filtered =
    selectedCategory === "All"
      ? Products
      : Products.filter((p) => p.category === selectedCategory);

  return (
    <div className="menu-products">
      {filtered.map((item, index) => (
        <div data-aos="fade up" key={index}>
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
