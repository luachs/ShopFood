// src/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/rbac/user");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Không có token, vui lòng đăng nhập" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }

    // verify token
    const decoded =  jwt.verify(token, process.env.JWT_SECRET);

    // lấy user từ DB
    const user = await User.findById(decoded.id).populate("role");
    if (!user) { 
      return res.status(401).json({ message: "User không tồn tại" });
    }

    req.user = user; // gắn vào request
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Xác thực thất bại" });
  }
};

module.exports = authMiddleware;
