import React, { useEffect, useState } from "react";
import "./CategorySelect.css";
import { Select, Divider, Input, Button, message } from "antd";
import categoryApi from "../../../../api/categoryApi";

const CategorySelect = ({ formData, setFormData }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryApi.getAll();
        setCategories(res);
        if (res.length > 0) {
          setFormData((prev) => ({ ...prev, category: res[0]._id }));
        }
      } catch (err) {
        message.error("Không lấy được danh mục: ", err);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return message.warning("Nhập tên danh mục!");
    try {
      const res = await categoryApi.add({ name: newCategory });
      setCategories((prev) => [...prev, res]);
      setNewCategory("");
      message.success("Đã thêm danh mục!");
    } catch {
      message.error("Lỗi khi thêm danh mục!");
    }
  };

  const handleEdit = async (cat) => {
    const newName = prompt("Nhập tên mới:", cat.name);
    if (!newName || newName === cat.name) return;
    try {
      await categoryApi.edit(cat._id, { name: newName });
      setCategories((prev) =>
        prev.map((c) => (c._id === cat._id ? { ...c, name: newName } : c))
      );
      message.success("Đã sửa danh mục!");
    } catch {
      message.error("Lỗi khi sửa!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa danh mục này?")) return;
    try {
      await categoryApi.remove(id);
      setCategories((prev) => prev.filter((c) => c._id !== id));
      message.success("Đã xóa!");
    } catch {
      message.error("Lỗi khi xóa!");
    }
  };

  return (
    <div className="add-product__field">
      <label className="add-product__label">Category</label>
      <Select
        style={{ width: "100%" }}
        value={formData.category}
        placeholder="Select category"
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, category: value }))
        }
        popupRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: "8px 0" }} />
            <div style={{ display: "flex", gap: 8, padding: "0 8px 4px" }}>
              <Input
                placeholder="Add new category..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onPressEnter={handleAddCategory}
              />
              <Button type="primary" onClick={handleAddCategory}>
                Add
              </Button>
            </div>
          </>
        )}
        dropdownStyle={{ zIndex: 3000 }}
      >
        {categories.map((cat) => (
          <Select.Option key={cat._id} value={cat._id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{cat.name}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  size="small"
                  type="text"
                  onClick={() => handleEdit(cat)}
                >
                  ✏️
                </Button>
                <Button
                  size="small"
                  danger
                  type="text"
                  onClick={() => handleDelete(cat._id)}
                >
                  🗑️
                </Button>
              </div>
            </div>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default CategorySelect;
