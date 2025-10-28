import React, { useEffect, useState } from "react";
import { Checkbox, Input, Button, Divider, message } from "antd";
import permissionGroupApi from "../../../../api/permissionGroupApi";
import "./PermissionGroupSelect.css";

const PermissionGroupSelect = ({ formData, setFormData }) => {
  const [permissionGroups, setPermissionGroups] = useState([]);
  const [newPermissionGroup, setNewPermissionGroup] = useState("");

  // 🟩 Lấy danh sách quyền
  useEffect(() => {
    const fetchPermissionGroups = async () => {
      try {
        const res = await permissionGroupApi.getAll();
        console.log(res.data);
        setPermissionGroups(res.data);
      } catch (err) {
        message.error("Không thể tải danh sách quyền!", err);
      }
    };
    fetchPermissionGroups();
  }, []);

  // 🟦 Thêm quyền mới
  const handleAddPermission = async () => {
    if (!newPermissionGroup.trim()) return message.warning("Nhập tên quyền!");
    try {
      const res = await permissionGroupApi.add({ _id: newPermissionGroup });
      console.log(res.data);
      setPermissionGroups((prev) => [...prev, res.data]);
      setNewPermissionGroup("");
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
      await permissionGroupApi.edit(perm._id, { _id: newName });
      setPermissionGroups((prev) =>
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
      await permissionGroupApi.delete(id);
      setPermissionGroups((prev) => prev.filter((p) => p._id !== id));
      message.success("Đã xóa!");
    } catch {
      message.error("Lỗi khi xóa!");
    }
  };

  // 🧩 Khi tick checkbox
  const handleChange = (checkedValues) => {
    setFormData((prev) => ({
      ...prev,
      permissionGroups: checkedValues, // danh sách id đã chọn
    }));
  };

  return (
    <div className="add-permission__field">
      <label className="add-permission__label">PermissionGroups</label>

      <div className="add-permission__list">
        <Checkbox.Group
          value={formData.permissionGroups?.map((p) => p._id || p) || []}
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          {permissionGroups.map((perm) => (
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
          value={newPermissionGroup}
          onChange={(e) => setNewPermissionGroup(e.target.value)}
          onPressEnter={handleAddPermission}
        />
        <Button type="primary" onClick={handleAddPermission}>
          Thêm
        </Button>
      </div>
    </div>
  );
};

export default PermissionGroupSelect;
