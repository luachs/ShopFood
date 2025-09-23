import React, { useState } from "react";
import "./EditCategory.css";
import categoryApi from "../../../api/categoryApi"; // import API
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categoryApi.getById(id);
        // Giả sử getById trả về { success: true, data: { name: "abc", description: "xyz" } }
        const category = res.data || res; // fallback cho chắc
        setFormData({
          name: category.name ?? "",
          description: category.description ?? "",
        });
      } catch (error) {
        console.log("Lỗi khi tìm thấy sản phẩm", error);
      }
    };
    fetchData();
  }, [id]);

  // 🟢 handle change input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // 🟢 Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await categoryApi.edit(id, formData); // chỉ cần gửi name + description
      alert("✅ Sửa danh mục thành công!");
      navigate("/listcategory");
    } catch (err) {
      console.error("❌ Lỗi khi sửa danh mục:", err);
      alert("Có lỗi khi sửa danh mục");
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
        Edit category
      </button>
    </form>
  );
};

export default EditCategory;
