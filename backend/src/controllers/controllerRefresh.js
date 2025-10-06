// controllers/controllerRefresh.js
const jwt = require("jsonwebtoken");
const User = require("../models/rbac/user");

const refresh = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken)
    return res.status(401).json({ message: "Không có refresh token" });

  try {
    // Tìm user có refresh token này
    const user = await User.findOne({ refreshToken });
    if (!user)
      return res.status(403).json({ message: "Refresh token không hợp lệ" });

    // Verify refresh token
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({
            message:
              err.name === "TokenExpiredError"
                ? "Refresh token đã hết hạn, vui lòng đăng nhập lại"
                : "Refresh token không hợp lệ",
          });
        }

        // 🟢 Tạo access token mới
        const accessToken = jwt.sign(
          {
            id: user._id,
            email: user.email,
            role: user.role,
            permissions: user.permissions,
          },
          process.env.JWT_SECRET,
          { expiresIn: "15m" }
        );

        // 🟢 Tạo refresh token mới (rotate)
        const newRefreshToken = jwt.sign(
          {
            id: user._id,
            email: user.email,
            role: user.role,
            permissions: user.permissions,
          },
          process.env.JWT_REFRESH_SECRET,
          { expiresIn: "30d" }
        );

        // Cập nhật refresh token trong DB (chặn dùng lại token cũ)
        user.refreshToken = newRefreshToken;
        await user.save();

        // ✅ Cấu hình cookie (Local vs Production)
        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // false khi local
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          path: "/",
        };

        res.cookie("access_token", accessToken, cookieOptions);
        res.cookie("refresh_token", newRefreshToken, cookieOptions);

        // ✅ Trả về JSON nếu frontend cần cập nhật state
        return res.json({
          message: "Refresh token thành công",
          accessToken, // optional, nếu frontend cần
        });
      }
    );
  } catch (err) {
    console.error("Lỗi refresh token:", err);
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

module.exports = { refresh };
