// src/controllers/controllerPermission.js
const Permission = require("../models/rbac/permission");

// Tạo permission
const createPermission = async (req, res) => {
  try {
    
    const { _id, description } = req.body;
    const existing = await Permission.findById(_id);
    if (existing)
      return res.status(400).json({ message: "Permission đã tồn tại" });

    const permission = new Permission({ _id, description });
    await permission.save();
    res.status(201).json(permission);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Lấy tất cả permission
const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Lấy permission theo id
const getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission)
      return res.status(404).json({ message: "Không tìm thấy permission" });
    res.json(permission);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Cập nhật permission
const updatePermission = async (req, res) => {
  try {
    const { description } = req.body;
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      { description },
      { new: true }
    );
    if (!permission)
      return res.status(404).json({ message: "Không tìm thấy permission" });
    res.json(permission);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Xóa permission
const deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);
    if (!permission)
      return res.status(404).json({ message: "Không tìm thấy permission" });
    res.json({ message: "Xóa permission thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
module.exports = {
  createPermission,
  updatePermission,
  deletePermission,
  getPermissionById,
  getPermissions,
};
