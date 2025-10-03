// src/middlewares/authorizeMiddleware.js
const Role = require("../models/rbac/role");
const PermissionGroup = require("../models/rbac/permissionGroup");

/**
 * authorize middleware - kiểm tra permission theo RBAC
 * @param {String} permissionName - ví dụ: "add_blog", "edit_product"
 */
const authorizeMiddleware = (permissionName) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Chưa đăng nhập" });
      }

      // --- Lấy role document (hỗ trợ cả string id hoặc object populated) ---
      let roleDoc = null;

      if (typeof req.user.role === "string") {
        roleDoc = await Role.findById(req.user.role).lean();
      } else if (
        req.user.role &&
        (req.user.role._id || req.user.role._id === 0)
      ) {
        roleDoc = req.user.role.toObject
          ? req.user.role.toObject()
          : req.user.role;
      }

      if (!roleDoc) {
        return res.status(403).json({ message: "Role không tồn tại" });
      }

      // --- Nếu role là Admin thì bỏ qua check luôn ---
      const roleId = String(roleDoc._id || roleDoc.id || "").toLowerCase();
      if (roleId === "admin") {
        return next();
      }

      // --- Thu thập quyền ---
      const collected = new Set();

      // Quyền trực tiếp của role
      if (Array.isArray(roleDoc.permissions)) {
        roleDoc.permissions.forEach((p) => {
          if (!p) return;
          collected.add(typeof p === "string" ? p : p._id);
        });
      }

      // Quyền từ các group
      const groupIds = (roleDoc.permissionGroups || [])
        .map((g) => (typeof g === "string" ? g : g._id || g.id))
        .filter(Boolean);

      if (groupIds.length > 0) {
        const groups = await PermissionGroup.find({
          _id: { $in: groupIds },
        }).lean();

        groups.forEach((g) => {
          if (!g || !Array.isArray(g.permissions)) return;
          g.permissions.forEach((p) => {
            if (p) collected.add(typeof p === "string" ? p : p._id);
          });
        });
      }

      // Quyền riêng trên user
      if (Array.isArray(req.user.permissions)) {
        req.user.permissions.forEach((p) => collected.add(p));
      }

      // --- Check cuối cùng ---
      if (!collected.has(permissionName)) {
        return res
          .status(403)
          .json({ message: "Bạn không có quyền thực hiện hành động này" });
      }

      next();
    } catch (err) {
      console.error("Authorize error:", err);
      res.status(500).json({ message: "Lỗi phân quyền" });
    }
  };
};

module.exports = authorizeMiddleware;
