import React from "react";
import CartItem from "../../CartItem/CartItem";
import "./MenuProducts.css";

import FriedEggs from "../../assets/images/Products/FriedEggs.png";
import HawaiianPizza from "../../assets/images/Products/HawaiianPizza.png";
import MartinezCocktail from "../../assets/images/Products/MartinezCocktail.png";
import ButterscotchCake from "../../assets/images/Products/ButterscotchCake.png";
import { useMenu } from "../../../contexts/MenuContext";

const Products = [
  {
    img: FriedEggs,
    cost: "$15.99",
    title: "Pizza",
    category: "Breakfast",
    desc: "Made with eggs, lettuce, salt, oil and other ingredients .ade with eggs, lettuce, salt, oil and other ingredients ",
  },
  {
    img: HawaiianPizza,
    cost: "$15.99",
    title: "Cheesecake",
    category: "Main Dishes",
    desc: "Made with eggs, lettuce, salt, oil and other ingredients .ade with eggs, lettuce, salt, oil and other ingredients ",
  },
  {
    img: ButterscotchCake,
    cost: "$15.99",
    title: "Fried Eggs",
    category: "Dessert",
    desc: "Made with eggs, lettuce, salt, oil and other ingredients .ade with eggs, lettuce, salt, oil and other ingredients ",
  },
  {
    img: ButterscotchCake,
    cost: "$15.99",
    title: "Fried Eggs",
    category: "Dessert",
    desc: "Made with eggs, lettuce, salt, oil and other ingredients .ade with eggs, lettuce, salt, oil and other ingredients ",
  },
  {
    img: MartinezCocktail,
    cost: "$15.99",
    title: "Cocktail",
    category: "Drinks",
    desc: "Made with eggs, lettuce, salt, oil and other ingredients .ade with eggs, lettuce, salt, oil and other ingredients ",
  },
  {
    img: HawaiianPizza,
    cost: "$15.99",
    title: "Cheesecake",
    category: "Main Dishes",
    desc: "Made with eggs, lettuce, salt, oil and other ingredients .ade with eggs, lettuce, salt, oil and other ingredients ",
  },
  {
    img: HawaiianPizza,
    cost: "$15.99",
    title: "Cheesecake",
    category: "Main Dishes",
    desc: "Made with eggs, lettuce, salt, oil and other ingredients .ade with eggs, lettuce, salt, oil and other ingredients ",
  },
  {
    img: ButterscotchCake,
    cost: "$15.99",
    title: "Fried Eggs",
    category: "Dessert",
    desc: "Made with eggs, lettuce, salt, oil and other ingredients .ade with eggs, lettuce, salt, oil and other ingredients ",
  },
  {
    img: ButterscotchCake,
    cost: "$15.99",
    title: "Fried Eggs",
    category: "Dessert",
    desc: "Made with eggs, lettuce, salt, oil and other ingredients .ade with eggs, lettuce, salt, oil and other ingredients ",
  },
];

const MenuProducts = () => {
  const { selectedCategory } = useMenu();

  const filtered =
    selectedCategory === "All"
      ? Products
      : Products.filter((p) => p.category === selectedCategory);

  return (
    <div className="menu-products">
      {filtered.map((item, index) => (
        <div data-aos="fade up" key={index}>
          <CartItem
            product
            medium
            img={item.img}
            cost={item.cost}
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
