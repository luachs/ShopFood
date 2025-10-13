const User = require("../models/rbac/user");

const checkUserManagePermission = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(401).json({ message: "Chưa login hoặc token lỗi" });
    }

    // Nếu là admin → bỏ qua mọi kiểm tra
    if (currentUser.role?._id === "admin") {
      return next();
    }

    const targetId = req.params.id || req.body.userId;

    // Nếu không có targetId → GET /users
    if (!targetId) {
      // staffUser chỉ được xem users
      if (currentUser.role?._id === "staffUser") {
        req.filterRole = "user"; // lưu filter cho route lấy danh sách
      }
      return next();
    }

    // Có targetId → thao tác cụ thể (update/delete)
    const targetUser = await User.findById(targetId).populate("role", "name");
    if (!targetUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // StaffUser chỉ thao tác được user
    if (
      currentUser.role?._id === "staffUser" &&
      targetUser.role?._id !== "user"
    ) {
      return res.status(403).json({
        message: "Bạn chỉ có thể quản lý người dùng có role là 'user'",
      });
    }

    next();
  } catch (err) {
    console.error("checkUserManagePermission error:", err);
    res.status(500).json({ message: "Lỗi kiểm tra quyền quản lý người dùng" });
  }
};

module.exports = checkUserManagePermission;
