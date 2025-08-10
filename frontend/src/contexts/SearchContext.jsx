/* eslint-disable react-refresh/only-export-components */
// src/context/SearchContext.js
import { createContext, useContext, useState } from "react";
import { searchProducts } from "@/service/productService"; // gọi mock API

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (keyword) => {
    setSearchTerm(keyword);

    if (keyword.trim()) {
      const data = await searchProducts(keyword);
      setResults(data);
    } else {
      setResults([]);
    }
  };

  return (
    <SearchContext.Provider
      value={{ searchTerm, results, setSearchTerm, handleSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
