import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import searchApi from "@/api/searchApi";
import "./Search.css";
import SearchResult from "./SearchResult/SearchResult";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lấy query ?q= từ URL
  const query = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    if (query) {
      fetchResults(query);
    }
  }, [query]);

  const fetchResults = async (q) => {
    setLoading(true);
    try {
      const data = await searchApi.search(q);
      setResults(data);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClickProduct = (id) => {
    navigate(`/products/${id}`); // điều hướng sang trang chi tiết sản phẩm
  };

  if (loading) return <p>Đang tìm kiếm...</p>;
  if (!results) return null;

  return (
    <div className="container search-page ">
      <h2 className="search-for-query">Kết quả cho: “{query}”</h2>

      <div className="result-section">
        <SearchResult
          results={results}
          handleClickProduct={handleClickProduct}
        />
      </div>
    </div>
  );
};

export default Search;
