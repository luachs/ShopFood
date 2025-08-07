import React, { useState, useEffect } from "react";
import "./SideBar.css";
import Button from "@/components/Button/Button";
import { useMenu } from "@/contexts/MenuContext";

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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSelectedCategory("All");
    // delay 1 tick event loop để đảm bảo update xong trước khi render
    setTimeout(() => setReady(true), 0);
  }, []);

  if (!ready) return null;
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
