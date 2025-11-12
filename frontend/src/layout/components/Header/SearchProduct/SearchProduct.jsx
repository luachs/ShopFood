import React, { useEffect, useState, useRef } from "react";
import "./SearchProduct.css";

import { useNavigate } from "react-router-dom";
import { useSearch } from "@/contexts/SearchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import InputField from "@/components/InputField/InputField";
import useDebounce from "@/hooks/useDebounce";
import searchApi from "@/api/searchApi";

const SearchProduct = () => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useSearch();
  const searchRef = useRef(null);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      setLoading(true);
      const res = await searchApi.searchSuggestions(query);
      console.log(res.products);
      setSuggestions(res.products || []); // ✅ lấy mảng products từ backend
      setShowSuggestions(true);
    } catch (error) {
      console.error("Lỗi khi lấy gợi ý:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearch.trim()) {
      fetchSuggestions(debouncedSearch);
      setShowSuggestions(false);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedSearch]);

  const handleSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleClickSuggestion = (id) => {
    setSearchTerm(name);

    window.location.href = `/products/${id}`;
    setShowSuggestions(false);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="search-product">
      <div className="search-box">
        <InputField
          value={searchTerm}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm sản phẩm..."
          className="search-product-input"
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)} // ✅ hiện lại khi focus
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="search-product-icon"
          onClick={handleSubmit}
        />
      </div>
      {showSuggestions && (
        <ul>
          {loading ? (
            <li className="suggestion-item loading">Đang tải...</li>
          ) : suggestions.length > 0 ? (
            suggestions.map((item) => (
              <li
                key={item.id}
                className="suggestions-item"
                onClick={() => handleClickSuggestion(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="suggestion-img"
                />
                <span>{item.name}</span>
              </li>
            ))
          ) : (
            <li className="suggestion-item no-result">Không có kết quả</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchProduct;
