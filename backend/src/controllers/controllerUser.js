const User = require("../models/rbac/user");
const bcrypt = require("bcryptjs");
const { getSortOptions } = require("../utils/sortHelper");

// CREATE
const createUser = async (req, res) => {
  try {
    const { username, email, password, role, permissions } = req.body;

    // super_admin có thể tạo cả admin và user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
      permissions: permissions || [],
    });

    await newUser.save();
    res.status(201).json({ message: "Tạo user thành công", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// READ ALL
const getAllUsers = async (req, res) => {
  try {
    const sortOption = getSortOptions(req, "createdAt");
    const filter = {};

    // Nếu middleware checkUserManagePermission set req.filterRole
    if (req.filterRole) {
      filter["role.name"] = req.filterRole;
    }

    // Lấy user theo filter
    const users = await User.find(filter)
      .select("-password -refreshToken")
      .populate("role", "name")
      .sort(sortOption);

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// READ BY ID
const getUserById = async (req, res) => {
  try {
    const currentUser = req.user;
    const user = await User.findById(req.params.id).populate(
      "role",
      "permissions permissionGroups"
    );

    if (!user) return res.status(404).json({ message: "User không tồn tại" });
    // StaffUser không được xem admin hoặc staff khác
    if (currentUser.role?._id === "staffUser" && user.role?._id !== "user") {
      return res.status(403).json({
        message: "Bạn không có quyền xem người dùng này",
      });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// UPDATE
const updateUser = async (req, res) => {
  try {
    const { username, email, password, role, permissions } = req.body;

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);
    if (role) updateData.role = role;
    if (permissions) updateData.permissions = permissions;

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    res.json({ message: "Cập nhật user thành công", user });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });
    res.json({ message: "Xoá user thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
