import React, { useState, useEffect } from "react";
import "./EditUser.css";
import userApi from "../../../api/userApi";
import { message } from "antd";

import RoleSelect from "../components/RoleSelect/RoleSelect";
import UserFormFields from "../components/UserFormFields/UserFormFields";
import PermissionSelect from "../components/PermissionSelect/PermissionSelect";
import PermissionGroupSelect from "../components/PermissionGroupSelect/PermissionGroupSelect";

const EditUser = ({ userId, onUpdate }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    permissionGroups: [],
    permissions: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const res = await userApi.getById(userId);
        const user = res.data;
        console.log("🔍 User:", user);

        setFormData({
          username: user.username || "",
          email: user.email || "",
          role: user.role._id,
          permissionGroups: user.role?.permissionGroups || [],
          permissions: user.role?.permissions || [],
        });
      } catch (err) {
        console.error(
          "❌ Lỗi khi tải user:",
          err.response?.data || err.message
        );
        message.error("Không thể tải người dùng!");
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, [userId]);
  const handleSubmit = async (e) => {
    e.preventDefault(); // chặn reload trang
    try {
      setLoading(true);
      await userApi.edit(userId, formData);
      message.success("Cập nhật người dùng thành công!");
      onUpdate && onUpdate(); // callback reload danh sách nếu có
    } catch (err) {
      console.error(err);
      message.error("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-product" onSubmit={handleSubmit}>
      <UserFormFields formData={formData} setFormData={setFormData} />
      <div className="add-product-wrapper">
        <div className="add-product-wrapper-left">
          <PermissionSelect formData={formData} setFormData={setFormData} />
          {/* <CategorySelect formData={formData} setFormData={setFormData} />
          <ImageUploader formData={formData} setFormData={setFormData} /> */}
          <PermissionGroupSelect
            formData={formData}
            setFormData={setFormData}
          />
          <RoleSelect formData={formData} setFormData={setFormData} />
        </div>

        <div className="add-product-wrapper-right"></div>
      </div>

      <button className="add-product__button" type="submit">
        Save changes
      </button>
    </form>
  );
};

export default EditUser;
