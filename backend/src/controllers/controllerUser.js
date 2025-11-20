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
      role: role || "Customer",
      permissions: permissions || [],
    });

    await newUser.save();
    res.status(201).json({ message: "Tạo user thành công", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // sort từ FE
    const sortField = req.query.sortField || "createdAt";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    // tạo sort object
    const sortOption = {};
    sortOption[sortField] = sortOrder;

    // filter (nếu có middleware set req.filterRole)
    const matchFilter = {};
    if (req.filterRole) {
      matchFilter["role.name"] = req.filterRole;
    }

    // aggregate
    const [users, totalItems] = await Promise.all([
      User.aggregate([
        { $match: matchFilter }, // filter theo role nếu có

        // nếu user có reference đến role collection
        // {
        //   $lookup: {
        //     from: "roles",
        //     localField: "role",
        //     foreignField: "_id",
        //     as: "role",
        //   },
        // },
        // { $unwind: { path: "$role", preserveNullAndEmptyArrays: true } },

        { $project: { password: 0, refreshToken: 0 } }, // bỏ sensitive

        { $sort: sortOption },

        { $skip: skip },
        { $limit: limit },
      ]),
      User.countDocuments(matchFilter),
    ]);

    res.json({
      data: users,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
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
