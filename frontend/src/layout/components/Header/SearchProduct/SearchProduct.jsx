import React from "react";
import "./SearchProduct.css";

import { useSearch } from "@/contexts/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import InputField from "@/components/InputField/InputField";

const SearchProduct = () => {
  const { searchTerm, setSearchTerm, handleSearch } = useSearch();

  console.log(searchTerm);
  return (
    <div>
      <div className="search-product">
        <InputField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={"Search product"}
          className="search-product-input"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="search-product-icon"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchProduct;
