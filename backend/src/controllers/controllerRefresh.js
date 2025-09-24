// controllers/controllerRefresh.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "Không có refresh token" });

  try {
    // Tìm user có refresh token này
    const user = await User.findOne({ refreshToken });
    if (!user)
      return res.status(403).json({ message: "Refresh token không hợp lệ" });

    // Verify refresh token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // 🟢 Cấp access token mới với đầy đủ role và permissions
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

    res.json({ message: "Refresh thành công", accessToken });
  } catch (err) {
    res.status(403).json({ message: "Refresh token không hợp lệ" });
  }
};

module.exports = { refresh };
