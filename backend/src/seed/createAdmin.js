const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/rbac/user");

require("dotenv").config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("✅ Admin đã tồn tại:", existingAdmin.email);
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      username: "admin",
      email: "admin01@gmail.com",
      password: hashedPassword,
      role: "admin",
      name: "Admin",
      bio: "Tài khoản quản trị hệ thống",
      avatar: "",
      isActive: true,
    });

    await admin.save();
    console.log("✅ Tạo admin thành công:", admin.email);
  } catch (err) {
    console.error("❌ Lỗi tạo admin:", err.message);
  } finally {
    await mongoose.connection.close();
    console.log("🔒 MongoDB connection closed");
  }
};

// **Gọi hàm ngay khi chạy script**
createAdmin();
