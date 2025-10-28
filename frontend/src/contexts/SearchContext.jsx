import { createContext, useContext, useState } from "react";
import searchApi from "@/api/searchApi";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (term) => {
    if (!term.trim()) return;
    try {
      setLoading(true);
      const data = await searchApi.search(term);
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{ searchTerm, results, setSearchTerm, handleSearch, loading }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
