import React from "react";
import "./SideBar.css";
import Button from "../Button/Button";
import { useMenu } from "../../contexts/MenuContext";
const categories = [
  {
    item: "All",
  },
  {
    item: "Breakfast",
  },
  {
    item: "Main Dishes",
  },
  {
    item: "Drinks",
  },
  {
    item: "Dessert",
  },
];

const Sidebar = () => {
  const { selectedCategory, setSelectedCategory } = useMenu();

  const handleSidebarMenu = (itemMenu) => {
    setSelectedCategory(itemMenu);
    window.scrollTo(0, 0);
  };
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        {categories.map((item, index) => {
          return (
            <Button
              primary={selectedCategory === item.item}
              outline={selectedCategory !== item.item}
              key={index}
              onClick={() => handleSidebarMenu(item.item)}
            >
              {item.item}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
