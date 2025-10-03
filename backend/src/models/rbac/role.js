// models/rbac/role.js
const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // ví dụ: "Admin", "Customer", "StaffProduct"
    permissionGroups: [{ type: String, ref: "PermissionGroup" }],
    permissions: [{ type: String, ref: "Permission" }],
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
