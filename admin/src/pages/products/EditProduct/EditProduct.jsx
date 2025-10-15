import React, { useState, useEffect } from "react";
import "./EditProduct.css"; // có thể dùng lại CSS cũ
import { message } from "antd";

import productApi from "../../../api/productApi";
import CategorySelect from "../components/CategorySelect/CategorySelect";
import ImageUploader from "../components/ImageUploader/ImageUploader";
import ProductFormFields from "../components/ProductFormFields/ProductFormFields";

const EditProduct = ({ productId, onUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: {},
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  // 🟢 Khi productId thay đổi → fetch chi tiết sản phẩm
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        setLoading(true);
        const res = await productApi.getById(productId);
        const p = res.data;
        setFormData({
          name: p.name || "",
          price: p.price || "",
          category: p.category || {},
          description: p.description || "",
          image: p.image || "",
        });
        console.log(res);
      } catch (err) {
        console.error(err);
        message.error("Không thể tải sản phẩm!");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // 🟢 Gửi request update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await productApi.edit(productId, {
        ...formData,
        price: Number(formData.price),
        updatedAt: new Date(),
      });
      console.log(res);
      message.success("Cập nhật sản phẩm thành công!");
      if (onUpdated) onUpdated(); // gọi callback để reload list + đóng modal
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi cập nhật sản phẩm!");
    }
  };
  useEffect(() => {
    console.log(productId);
  });
  if (loading) return <p>Đang tải sản phẩm...</p>;
  return (
    <form className="add-product" onSubmit={handleSubmit}>
      <ProductFormFields formData={formData} setFormData={setFormData} />

      <div className="add-product-wrapper">
        <div className="add-product-wrapper-left">
          <CategorySelect formData={formData} setFormData={setFormData} />
          <ImageUploader formData={formData} setFormData={setFormData} />
        </div>

        <div className="add-product-wrapper-right">
          <label className="add-product__label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="add-product__textarea"
            rows="9"
          />
        </div>
      </div>

      <button className="add-product__button" type="submit">
        Save changes
      </button>
    </form>
  );
};

export default EditProduct;
