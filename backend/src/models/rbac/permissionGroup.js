const mongoose = require("mongoose");

const permissionGroupSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // ví dụ: "BlogManagement"
    permissions: [{ type: String, ref: "Permission" }],
  },
  { timestamps: true }
);

const PermissionGroup = mongoose.model(
  "PermissionGroup",
  permissionGroupSchema
);

module.exports = PermissionGroup;
