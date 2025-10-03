// controllers/controllerPermissionGroup.js
const PermissionGroup = require("../models/rbac/permissionGroup");

// Tạo PermissionGroup
const createPermissionGroup = async (req, res) => {
  try {
    const { _id, permissions } = req.body;
    const existing = await PermissionGroup.findById(_id);
    if (existing)
      return res.status(400).json({ message: "PermissionGroup đã tồn tại" });

    const group = new PermissionGroup({ _id, permissions });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Lấy tất cả PermissionGroup
const getPermissionGroups = async (req, res) => {
  try {
    const groups = await PermissionGroup.find().populate("permissions");
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Lấy PermissionGroup theo id
const getPermissionGroupById = async (req, res) => {
  try {
    const group = await PermissionGroup.findById(req.params.id).populate(
      "permissions"
    );
    if (!group)
      return res
        .status(404)
        .json({ message: "Không tìm thấy PermissionGroup" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Cập nhật PermissionGroup
const updatePermissionGroup = async (req, res) => {
  try {
    const { permissions } = req.body;
    const group = await PermissionGroup.findByIdAndUpdate(
      req.params.id,
      { permissions },
      { new: true }
    ).populate("permissions");
    if (!group)
      return res
        .status(404)
        .json({ message: "Không tìm thấy PermissionGroup" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Xóa PermissionGroup
const deletePermissionGroup = async (req, res) => {
  try {
    const group = await PermissionGroup.findByIdAndDelete(req.params.id);
    if (!group)
      return res
        .status(404)
        .json({ message: "Không tìm thấy PermissionGroup" });
    res.json({ message: "Xóa PermissionGroup thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

module.exports = {
  createPermissionGroup,
  getPermissionGroups,
  getPermissionGroupById,
  updatePermissionGroup,
  deletePermissionGroup,
};
