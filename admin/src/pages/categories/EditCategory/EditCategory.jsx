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

  // 🟢 handle change input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // 🟢 Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await categoryApi.edit(id, {
        ...formData,
        createAt: new Date(),
      });
      console.log("Sửa thành công:", res);
      alert("Sửa danh mục thành công!");

      navigate("/listcategory");
    } catch (err) {
      console.error("Lỗi khi Sửa danh mục:", err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categoryApi.getById(id);
        console.log("Server trả về:", res);
        setFormData({
          name: res.data?.name || "",
          description: res.data?.description || "",
        });
        console.log(formData);
      } catch (error) {
        console.log("Lỗi khi tìm thấy sản phẩm", error);
      }
    };
    fetchData();
  }, [id]);
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
