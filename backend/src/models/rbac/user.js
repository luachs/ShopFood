// src/models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },

    name: { type: String },
    avatar: { type: String },
    bio: { type: String, maxlength: 500 },

    role: {
      type: String,
      ref: "Role",
      required: true,
      default: "Customer",
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
