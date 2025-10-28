import React, { useState, useEffect } from "react";
import "./AddUser.css";
import userApi from "../../../api/userApi";
import { message } from "antd";

import UserFormFields from "../components/UserFormFields/UserFormFields";
import PermissionSelect from "../components/PermissionSelect/PermissionSelect";
import PermissionGroupSelect from "../components/PermissionGroupSelect/PermissionGroupSelect";

const AddUser = ({ userId, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
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
          name: user.name || "",
          email: user.email || "",
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

  return (
    <form className="add-product">
      <UserFormFields formData={formData} setFormData={setFormData} />
      <div className="add-product-wrapper">
        <div className="add-product-wrapper-left">
          <PermissionSelect formData={formData} setFormData={setFormData} />
          {/* <CategorySelect formData={formData} setFormData={setFormData} />
          <ImageUploader formData={formData} setFormData={setFormData} /> */}
        </div>

        <div className="add-product-wrapper-right">
          <PermissionGroupSelect
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>

      <button className="add-product__button" type="submit">
        Save changes
      </button>
    </form>
  );
};

export default AddUser;
