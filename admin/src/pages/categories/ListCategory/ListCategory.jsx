import React, { useEffect, useState } from "react";
import "./ListCategory.css";

import { Link } from "react-router-dom";
import categoryApi from "../../../api/categoryApi";

const ListCategory = () => {
  const [categories, setCategories] = useState([]);

  const handleDelete = async (id) => {
    try {
      const res = await categoryApi.remove(id);
      console.log("Xoá thành công:", res);
      setCategories((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.log("Lỗi xóa: ", error);
    }
  };
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await categoryApi.getAll();
        setCategories(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục: ", error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className="list-product">
      <h1>List product</h1>
      <table cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>STT</th>
            <th>name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, id) => (
            <tr key={id}>
              <td data-label="ID">{id + 1}</td>
              <td data-label="Name">{category.name}</td>
              <td data-label="Description">{category.description}</td>
              <td data-label="Actions">
                <Link to={`/editcategory/${category._id}`}>
                  <button className="btn-edit">Sửa</button>
                </Link>

                <button
                  className="btn-delete"
                  onClick={() => handleDelete(category._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCategory;
