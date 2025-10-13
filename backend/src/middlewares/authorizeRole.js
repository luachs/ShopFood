// middlewares/authorizeRole.js
module.exports = function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: "Chưa đăng nhập" });
      }
      // ✅ Admin luôn được phép
      if (user.role._id === "admin") {
        return next();
      }
      // Nếu role của user không nằm trong danh sách cho phép
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Không có quyền truy cập" });
      }

      next(); // ✅ Cho phép tiếp tục
    } catch (err) {
      console.error("Authorize Error:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }
  };
};
