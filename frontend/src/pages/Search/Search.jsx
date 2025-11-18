import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import searchApi from "@/api/searchApi";
import "./Search.css";
import SearchResult from "./SearchResult/SearchResult";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const [productPage, setProductPage] = useState(1);
  const [blogPage, setBlogPage] = useState(1);

  // Lấy ?q= từ URL
  const query = new URLSearchParams(location.search).get("q") || "";

  // Khi query thay đổi → reset pagination
  useEffect(() => {
    setProductPage(1);
    setBlogPage(1);
  }, [query]);

  useEffect(() => {
    if (query.trim()) {
      fetchResults(query);
    }
  }, [query, productPage, blogPage]);

  const fetchResults = async (q) => {
    setLoading(true);
    try {
      const data = await searchApi.search({
        q,
        productPage,
        blogPage,
        productLimit: 6,
        blogLimit: 6,
      });

      setResults(data);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClickProduct = (id) => {
    navigate(`/products/${id}`);
  };

  if (loading) return <p>Đang tìm kiếm...</p>;
  if (!results) return null;

  return (
    <div className="container search-page">
      <h2 className="search-for-query">Kết quả tìm kiếm của “{query}”:</h2>

      <SearchResult
        results={results}
        setProductPage={setProductPage}
        setBlogPage={setBlogPage}
        handleClickProduct={handleClickProduct}
      />
    </div>
  );
};

export default Search;
