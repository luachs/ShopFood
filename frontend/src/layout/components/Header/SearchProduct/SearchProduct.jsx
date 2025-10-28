import React from "react";
import "./SearchProduct.css";

import { useNavigate } from "react-router-dom";
import { useSearch } from "@/contexts/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import InputField from "@/components/InputField/InputField";

const SearchProduct = () => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useSearch();

  const handleSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="search-product">
      <InputField
        value={searchTerm}
        onKeyDown={handleKeyDown}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Tìm sản phẩm..."
        className="search-product-input"
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="search-product-icon"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default SearchProduct;
