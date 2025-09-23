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
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Cấp access token mới
    const accessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Refresh token không hợp lệ" });
  }
};

module.exports = { refresh };
