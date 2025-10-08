// src/middlewares/checkUserManagePermission.js
const User = require("../models/rbac/user");

const checkUserManagePermission = async (req, res, next) => {
  try {
    const currentUser = req.user; // đã có từ authMiddleware
    const targetId = req.params.id || req.body.userId; // ID user bị thao tác

    if (!targetId) {
      return res.status(400).json({ message: "Thiếu userId hoặc params.id" });
    }
    // Nếu không phải staffUser => cấm
    if (currentUser.role?.name !== "staffUser") {
      return res
        .status(403)
        .json({ message: "Chỉ staffUser hoặc admin mới được phép thao tác" });
    }

    // ✅ Lấy thông tin user bị thao tác
    const targetUser = await User.findById(targetId).populate("role", "name");

    if (!targetUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // ✅ Staff chỉ được quản lý user có role là "user"
    if (targetUser.role?.name !== "user") {
      return res.status(403).json({
        message: "Bạn chỉ có thể quản lý người dùng có role là 'user'",
      });
    }

    // ✅ OK -> cho phép qua
    next();
  } catch (err) {
    console.error("checkUserManagePermission error:", err);
    res.status(500).json({ message: "Lỗi kiểm tra quyền quản lý người dùng" });
  }
};

module.exports = checkUserManagePermission;
