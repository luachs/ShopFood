const User = require("../models/rbac/user");
const bcrypt = require("bcryptjs");

// 🟢 Lấy thông tin chính mình
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("name email avatar bio role") // chỉ lấy field cần thiết
      .populate("role", "name") // nếu có ref role
      .lean();

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.json({
      message: "Lấy thông tin thành công",
      user, // ✅ gói trong object để frontend dễ xử lý
    });
  } catch (err) {
    res.status(500).json({
      message: "Lỗi lấy profile",
      error: err.message,
    });
  }
};

// 🟢 Cập nhật profile chính mình
const updateProfile = async (req, res) => {
  try {
    const allowedFields = ["name", "avatar", "bio"]; // chỉ cho update các field này
    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const updated = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      select: "name email avatar bio role",
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Lỗi cập nhật profile", error: err });
  }
};

// 🟢 Đổi mật khẩu
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ mật khẩu" });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi đổi mật khẩu", error: err });
  }
};

// 🟢 Lấy profile công khai của người khác
const getPublicProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .select("name avatar bio") // chỉ field công khai
      .lean();

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy user" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy public profile" });
  }
};

module.exports = {
  getProfile,
  changePassword,
  updateProfile,
  getPublicProfile,
};
