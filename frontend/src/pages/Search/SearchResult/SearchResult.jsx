import React from "react";
import CartItem from "@/components/CartItem/CartItem";
import "./SearchResult.css";
import { Link } from "react-router-dom";
import config from "@/config/config";
import { useCart } from "@/contexts/CartContext";

const SearchResult = ({
  results,
  setProductPage,
  setBlogPage,
  handleClickProduct,
}) => {
  const { addItem } = useCart();

  if (!results) return null;

  const { products, blogs } = results;

  const extractFirstImage = (html) => {
    if (!html) return null;
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : null;
  };

  return (
    <div className="search-result">
      <div className="result-section">
        {/* PRODUCT RESULTS */}
        <div className="search-title-field">Sản phẩm:</div>
        <div className="result-grid">
          {products.data.map((p) => (
            <div
              data-aos="fade up"
              key={p._id}
              onClick={() => handleClickProduct(p.id)}
              style={{ cursor: "pointer" }}
            >
              <CartItem
                key={p._id}
                id={p._id}
                img={p.image}
                title={p.name}
                desc={p.description}
                price={p.price}
                medium
                product
                onAddToCart={addItem}
              />
            </div>
          ))}
        </div>

        {/* PRODUCT PAGINATION */}
        <div className="pagination">
          <button
            disabled={!products.pagination.hasPrevPage}
            onClick={() => setProductPage(products.pagination.page - 1)}
          >
            Prev
          </button>

          <span>
            {products.pagination.page}/{products.pagination.totalPages}
          </span>

          <button
            disabled={!products.pagination.hasNextPage}
            onClick={() => setProductPage(products.pagination.page + 1)}
          >
            Next
          </button>
        </div>

        {/* BLOG RESULTS */}
        <div className="search-title-field">Tin tức:</div>
        <div className="result-grid">
          {blogs.data.map((b) => (
            <Link key={b._id} to={`${config.routes.blog}/${b._id}`}>
              <CartItem
                img={
                  extractFirstImage(b.content) || "https://placehold.co/300x200"
                }
                title={b.title}
                desc={b.content}
                date={new Date(b.createdAt).toLocaleDateString("vi-VN")}
                medium
              />
            </Link>
          ))}
        </div>

        {/* BLOG PAGINATION */}
        <div className="pagination">
          <button
            disabled={!blogs.pagination.hasPrevPage}
            onClick={() => setBlogPage(blogs.pagination.page - 1)}
          >
            Prev
          </button>

          <span>
            {blogs.pagination.page}/{blogs.pagination.totalPages}
          </span>

          <button
            disabled={!blogs.pagination.hasNextPage}
            onClick={() => setBlogPage(blogs.pagination.page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
