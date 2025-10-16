const jwt = require("jsonwebtoken");
const User = require("../models/rbac/user");

const authMiddleware = async (req, res, next) => {
  try {
    // ✅ Lấy token từ cookie hoặc header
    const token =
      req.cookies?.access_token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Không có token, vui lòng đăng nhập" });
    }

    // ✅ verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ lấy user từ DB
    const user = await User.findById(decoded.id).populate("role");
    if (!user) {
      return res.status(401).json({ message: "User không tồn tại" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    // ⚠️ Phân biệt lỗi hết hạn token
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "TokenExpired" }); // 👈 Gửi riêng
    }
    res.status(401).json({ message: "Xác thực thất bại", error: err.message });
  }
};

module.exports = authMiddleware;
