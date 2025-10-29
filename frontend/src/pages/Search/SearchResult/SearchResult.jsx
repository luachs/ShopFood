import React from "react";
import CartItem from "@/components/CartItem/CartItem";
import "./SearchResult.css";
import { Link } from "react-router-dom";
import config from "@/config/config";

const SearchResult = ({ results, handleClickProduct }) => {
  if (!results) return null;
  const { products = [], blogs = [] } = results;

  // 🧠 Hàm xử lý thêm vào giỏ (tuỳ bạn có hay chưa)
  const handleAddToCart = (product) => {
    console.log("🛒 Thêm vào giỏ:", product);
    // Tích hợp logic thực tế: dispatch Redux / gọi context / lưu localStorage
  };
  const extractFirstImage = (html) => {
    if (!html) return null;
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : null;
  };

  return (
    <div className="search-result">
      {/* --- SẢN PHẨM --- */}
      <div className="result-section">
        {products.length === 0 ? (
          <p style={{ margin: "0 20px" }}>Không tìm thấy kết quả nào</p>
        ) : (
          <div className="result-grid">
            {products.map((p) => (
              <div
                data-aos="fade up"
                key={p._id}
                onClick={() => handleClickProduct(p.id)}
                style={{ cursor: "pointer" }}
              >
                <CartItem
                  id={p._id}
                  img={p.image || "/no-image.png"}
                  title={p.name}
                  desc={p.description || ""}
                  price={p.price}
                  product
                  medium
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}

            {blogs.map((b) => (
              <Link
                data-aos="fade up"
                key={b._id}
                to={`${config.routes.blog}/${b._id}`}
              >
                <CartItem
                  img={
                    extractFirstImage(b.content) ||
                    "https://placehold.co/300x200"
                  }
                  date={
                    b.createdAt
                      ? new Date(b.createdAt).toLocaleDateString("vi-VN")
                      : ""
                  }
                  title={b.title}
                  desc={b.content}
                  medium
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
