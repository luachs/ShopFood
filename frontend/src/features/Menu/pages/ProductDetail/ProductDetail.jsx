import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productApi from "@/api/productsApi";
import "./ProductDetail.css";
import Button from "@/components/Button/Button";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // ✅ thêm state quantity
  const { addItem } = useCart(); // ✅ gọi đúng hàm từ context

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await productApi.getById(id);
        setProduct(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Lỗi khi tải sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToCart = async () => {
    try {
      await addItem(product._id, quantity); // ✅ thêm sản phẩm vào cart
      alert(`Đã thêm ${quantity} ${product.name} vào giỏ hàng`);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi thêm sản phẩm vào giỏ hàng");
    }
  };

  if (loading) return <div className="container">Đang tải sản phẩm...</div>;
  if (error) return <div className="container">{error}</div>;
  if (!product) return <div className="container">Không tìm thấy sản phẩm</div>;

  return (
    <div className="container page-productDetail">
      <Button className="btn-back" primary onClick={handleBack}>
        ← Quay lại
      </Button>
      <div className="product-detail">
        <div className="product-images">
          <img
            src={product.image || "https://via.placeholder.com/400x300"}
            alt={product.name}
          />
        </div>
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">{product.price.toLocaleString()}₫</p>
          <p className="product-category">
            Danh mục: {product.category?.name || "Không xác định"}
          </p>

          <div className="product-actions">
            <label>Số lượng:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <Button primary onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
      <p className="product-description">{product.description}</p>
    </div>
  );
};

export default ProductDetail;
