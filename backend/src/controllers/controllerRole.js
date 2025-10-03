// controllers/controllerRole.js
const Role = require("../models/rbac/role");

// Tạo Role
const createRole = async (req, res) => {
  try {
    const { _id, permissionGroups, permissions } = req.body;
    const existing = await Role.findById(_id);
    if (existing) return res.status(400).json({ message: "Role đã tồn tại" });

    const role = new Role({ _id, permissionGroups, permissions });
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Lấy tất cả Role
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find()
      .populate("permissionGroups")
      .populate("permissions");
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Lấy Role theo id
const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id)
      .populate("permissionGroups")
      .populate("permissions");
    if (!role) return res.status(404).json({ message: "Không tìm thấy Role" });
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Cập nhật Role
const updateRole = async (req, res) => {
  try {
    const { permissionGroups, permissions } = req.body;
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { permissionGroups, permissions },
      { new: true }
    )
      .populate("permissionGroups")
      .populate("permissions");

    if (!role) return res.status(404).json({ message: "Không tìm thấy Role" });
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Xóa Role
const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: "Không tìm thấy Role" });
    res.json({ message: "Xóa Role thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
