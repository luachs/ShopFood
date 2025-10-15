import React from "react";
import "./ProductFormFields.css";

const ProductFormFields = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="add-product__field">
        <label className="add-product__label">Product Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="add-product__input"
        />
      </div>

      <div className="add-product__field">
        <label className="add-product__label">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="add-product__input"
        />
      </div>
    </>
  );
};

export default ProductFormFields;
