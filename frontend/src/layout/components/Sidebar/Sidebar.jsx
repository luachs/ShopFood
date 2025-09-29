import React, { useState, useEffect } from "react";
import "./SideBar.css";
import Button from "@/components/Button/Button";
import { useMenu } from "@/contexts/MenuContext";
import categoryApi from "@/api/categoryApi";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const { selectedCategory, setSelectedCategory } = useMenu();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await categoryApi.getAll();
      setCategories(res);
    };
    fetchData();
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
        <Button
          primary={selectedCategory === "All"}
          outline={selectedCategory !== "All"}
          onClick={() => handleSidebarMenu("All")}
        >
          All
        </Button>
        {categories.map((item) => (
          <Button
            primary={selectedCategory === item.name}
            outline={selectedCategory !== item.name}
            key={item._id}
            onClick={() => handleSidebarMenu(item.name)}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
