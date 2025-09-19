import React, { useState } from "react";
import "./AddCategory.css";
import categoryApi from "../../../api/categoryApi"; // import API

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  // 🟢 handle change input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // 🟢 Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await categoryApi.add({
        ...formData,
        createAt: new Date(),
      });
      console.log("Thêm thành công:", res);
      alert("Thêm danh mục thành công!");
    } catch (err) {
      console.error("Lỗi khi thêm danh mục:", err);
    }
  };

  return (
    <form className="add-category" onSubmit={handleSubmit}>
      <div className="add-category__field">
        <label className="add-category__label">Name category</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="add-category__input"
        />
      </div>
      <div className="add-category-wrapper">
        <label className="add-category__label">Description</label>
        <textarea
          className="add-category__textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="9"
        />
      </div>

      <button className="add-category__button" type="submit">
        Add category
      </button>
    </form>
  );
};

export default AddCategory;
