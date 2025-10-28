import React, { useEffect, useState } from "react";
import { Checkbox, Input, Button, Divider, message } from "antd";
import permissionApi from "../../../../api/permissionApi";
import "./PermissionSelect.css";

const PermissionSelect = ({ formData, setFormData }) => {
  const [permissions, setPermissions] = useState([]);
  const [newPermission, setNewPermission] = useState("");

  // 🟩 Lấy danh sách quyền
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await permissionApi.getAll();
        console.log(res.data);
        setPermissions(res.data);
      } catch (err) {
        message.error("Không thể tải danh sách quyền!", err);
      }
    };
    fetchPermissions();
  }, []);

  // 🟦 Thêm quyền mới
  const handleAddPermission = async () => {
    if (!newPermission.trim()) return message.warning("Nhập tên quyền!");
    try {
      const res = await permissionApi.add({ _id: newPermission });
      console.log(res.data);
      setPermissions((prev) => [...prev, res.data]);
      setNewPermission("");
      message.success("Đã thêm quyền!");
    } catch {
      message.error("Lỗi khi thêm quyền!");
    }
  };

  // 🟨 Sửa quyền
  const handleEdit = async (perm) => {
    const newName = prompt("Nhập tên mới:", perm._id);
    if (!newName || newName === perm._id) return;
    try {
      await permissionApi.edit(perm._id, { _id: newName });
      setPermissions((prev) =>
        prev.map((p) => (p._id === perm._id ? { ...p, name: newName } : p))
      );
      message.success("Đã sửa quyền!");
    } catch {
      message.error("Lỗi khi sửa!");
    }
  };

  // 🟥 Xóa quyền
  const handleDelete = async (id) => {
    if (!window.confirm("Xóa quyền này?")) return;
    try {
      await permissionApi.delete(id);
      setPermissions((prev) => prev.filter((p) => p._id !== id));
      message.success("Đã xóa!");
    } catch {
      message.error("Lỗi khi xóa!");
    }
  };

  // 🧩 Khi tick checkbox
  const handleChange = (checkedValues) => {
    setFormData((prev) => ({
      ...prev,
      permissions: checkedValues, // danh sách id đã chọn
    }));
  };

  return (
    <div className="add-permission__field">
      <label className="add-permission__label">Permissions</label>

      <div className="add-permission__list">
        <Checkbox.Group
          value={formData.permissions?.map((p) => p._id || p) || []}
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          {permissions.map((perm) => (
            <div key={perm._id} className="add-permission__item">
              <Checkbox value={perm._id}>{perm._id}</Checkbox>
              <div className="add-permission__actions">
                <Button
                  size="small"
                  type="text"
                  onClick={() => handleEdit(perm)}
                >
                  ✏️
                </Button>
                <Button
                  size="small"
                  danger
                  type="text"
                  onClick={() => handleDelete(perm._id)}
                >
                  🗑️
                </Button>
              </div>
            </div>
          ))}
        </Checkbox.Group>
      </div>

      <Divider />
      <div className="add-permission__addbox">
        <Input
          placeholder="Thêm quyền mới..."
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
          onPressEnter={handleAddPermission}
        />
        <Button type="primary" onClick={handleAddPermission}>
          Thêm
        </Button>
      </div>
    </div>
  );
};

export default PermissionSelect;
