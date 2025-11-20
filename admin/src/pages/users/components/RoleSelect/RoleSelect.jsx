import React, { useState, useEffect } from "react";
import { Select, Button, Input, message, Divider } from "antd";
import roleApi from "../../../../api/roleApi";
import "./RoleSelect.css";

const RoleSelect = ({ formData, setFormData }) => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState();

  // 🟩 Lấy danh sách role
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await roleApi.getAll();
        setRoles(res.data);
      } catch {
        message.error("Không thể tải danh sách role!");
      }
    };
    fetchRoles();
  }, []);

  // 🟦 Thêm role
  const handleAddRole = async () => {
    if (!newRole.trim()) return message.warning("Nhập tên role!");
    try {
      const res = await roleApi.add({ name: newRole });

      setRoles((prev) => [...prev, res.data]);
      setNewRole("");
      message.success("Đã thêm Role!");
    } catch {
      message.error("Lỗi khi thêm Role!");
    }
  };

  return (
    <div className="add-role__field">
      <label className="add-permission__label">Role</label>

      <Select
        style={{ width: "100%" }}
        placeholder="Chọn role..."
        value={formData.role?._id || formData.role || ""}
        onChange={(value) =>
          setFormData((prev) => ({
            ...prev,
            role: value, // lưu ID của role
          }))
        }
        options={roles.map((r) => ({
          label: r.name,
          value: r._id,
        }))}
      />

      <Divider />

      <div className="add-role__addbox">
        <Input
          placeholder="Thêm Role mới..."
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          onPressEnter={handleAddRole}
        />
        <Button type="primary" onClick={handleAddRole}>
          Thêm
        </Button>
      </div>
    </div>
  );
};

export default RoleSelect;
