import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productApi from "@/api/productsApi";
import "./ProductDetail.css";
import Button from "@/components/Button/Button";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    console.log(id);
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await productApi.getById(id);
        console.log(res.data);
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
  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} ${product.name} vào giỏ hàng`);
    // sau này: dispatch Context / Redux để thêm vào cart
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
            <label>Số lượng</label>
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
