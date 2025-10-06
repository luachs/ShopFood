const User = require("../models/rbac/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // check user tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // tìm user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Sai email hoặc mật khẩu" });

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Sai email hoặc mật khẩu" });

    // Tạo access + refresh token
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

    const refreshToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    // Lưu refresh token vào DB
    user.refreshToken = refreshToken;
    await user.save();

    // ✅ Set cookie
    const cookieOptions = {
      httpOnly: true,
      secure: false, // ⚠️ local không có HTTPS
      sameSite: "Lax",
      domain: process.env.COOKIE_DOMAIN,
      path: "/",
    };

    res.cookie("access_token", accessToken, cookieOptions);
    res.cookie("refresh_token", refreshToken, cookieOptions);

    res.json({
      message: "Đăng nhập thành công",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken)
      return res.status(400).json({ message: "Không có refresh token" });

    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.clearCookie("access_token", { path: "/" });
    res.clearCookie("refresh_token", { path: "/" });

    res.json({ message: "Đăng xuất thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
module.exports = {
  login,
  register,
  logout,
};
