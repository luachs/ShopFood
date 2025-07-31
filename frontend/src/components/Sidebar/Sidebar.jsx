import React, { useState } from "react";
import "./SideBar.css";
import Button from "../Button/Button";

const SidebarMenu = [
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
  const [activeMenu, setActiveMenu] = useState(0);

  const handleSidebarMenu = (itemMenu) => {
    setActiveMenu(itemMenu);
  };
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        {SidebarMenu.map((item, index) => {
          return (
            <Button
              primary={activeMenu === index}
              outline={activeMenu !== index}
              key={index}
              onClick={() => handleSidebarMenu(index)}
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
