import React, { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <MenuContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </MenuContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMenu = () => useContext(MenuContext);
