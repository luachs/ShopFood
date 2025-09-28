import React, { useState, useEffect } from "react";
import "./EditUser.css";
import userApi from "../../../api/userApi";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "user",
    permissions: [],
  });
  const [newPermission, setNewPermission] = useState("");

  // 🟢 Lấy user theo id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userApi.getById(id);
        const user = res.data || res;
        setFormData({
          role: user.role ?? "user",
          permissions: user.permissions ?? [],
        });
      } catch (error) {
        console.error("❌ Lỗi khi tìm user:", error);
      }
    };
    fetchData();
  }, [id]);

  // 🟢 Xử lý thay đổi role
  const handleRoleChange = (e) => {
    setFormData((prev) => ({ ...prev, role: e.target.value }));
  };

  // 🟢 Xử lý thêm permission
  const handleAddPermission = () => {
    const perm = newPermission.trim();
    if (!perm || formData.permissions.includes(perm)) return;
    setFormData((prev) => ({
      ...prev,
      permissions: [...prev.permissions, perm],
    }));
    setNewPermission("");
  };

  // 🟢 Xóa permission
  const handleRemovePermission = (perm) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.filter((p) => p !== perm),
    }));
  };

  // 🟢 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userApi.edit(id, formData);
      alert("✅ Sửa user thành công!");
      navigate("/listuser");
    } catch (err) {
      console.error("❌ Lỗi khi sửa user:", err);
      alert("Có lỗi khi sửa user");
    }
  };

  return (
    <form className="edit-user" onSubmit={handleSubmit}>
      {/* Role */}
      <div className="edit-user__field">
        <label className="edit-user__label">Role</label>
        <select
          value={formData.role}
          onChange={handleRoleChange}
          className="edit-user__select"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>
      </div>

      {/* Permissions */}
      <div className="edit-user__field">
        <label className="edit-user__label">Permissions</label>
        <ul className="edit-user__permissions">
          {formData.permissions.map((perm, index) => (
            <li key={index} className="edit-user__permission">
              {perm}
              <button
                type="button"
                className="btn-remove"
                onClick={() => handleRemovePermission(perm)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        <div className="edit-user__add-permission">
          <input
            type="text"
            value={newPermission}
            onChange={(e) => setNewPermission(e.target.value)}
            placeholder="Nhập permission mới"
            className="edit-user__input"
          />
          <button
            type="button"
            className="btn-add"
            onClick={handleAddPermission}
          >
            ➕ Thêm
          </button>
        </div>
      </div>

      <button className="edit-user__button" type="submit">
        Lưu thay đổi
      </button>
    </form>
  );
};

export default EditUser;
