// Kiểm tra role cụ thể
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Bạn không có quyền truy cập" });
    }
    next();
  };
};

// Kiểm tra permission cụ thể
const authorizePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user.permissions.includes(permission)) {
      return res
        .status(403)
        .json({ message: "Bạn thiếu quyền: " + permission });
    }
    next();
  };
};

module.exports = { authorizeRole, authorizePermission };
