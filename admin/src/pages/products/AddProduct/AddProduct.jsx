import React, { useState } from "react";
import "./AddProduct.css";
import { message } from "antd";

import productApi from "../../../api/productApi";
import CategorySelect from "../components/CategorySelect/CategorySelect";
import ImageUploader from "../components/ImageUploader/ImageUploader";
import ProductFormFields from "../components/ProductFormFields/ProductFormFields";

const AddProduct = ({ onAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productApi.add({
        ...formData,
        price: Number(formData.price),
        createdAt: new Date(),
      });
      alert("Thêm sản phẩm thành công!");
      message.success("Thêm sản phẩm thành công!");
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
      });
      // 🔥 gọi callback nếu có
      if (onAdded) onAdded();
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi thêm sản phẩm!");
    }
  };

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
        Add product
      </button>
    </form>
  );
};

export default AddProduct;
