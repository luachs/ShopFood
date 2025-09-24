// src/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String }, // 🟢 thêm trường này

    // 🟢 Thêm trường role & permissions
    role: {
      type: String,
      enum: ["user", "admin", "super_admin"],
      default: "user",
    },
    permissions: { type: [String], default: [] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
