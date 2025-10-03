// src/routes/permissionRoutes.js
const express = require("express");
const router = express.Router();
const {
  createPermission,
  updatePermission,
  deletePermission,
  getPermissionById,
  getPermissions,
} = require("../controllers/controllerPermission");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeMiddleware = require("../middlewares/authorizeMiddleware");

// CRUD Permission
router.post(
  "/",
  authMiddleware,
  authorizeMiddleware("manage_permission"),
  createPermission
);

router.get(
  "/",
  authMiddleware,
  authorizeMiddleware("manage_permission"),
  getPermissions
);

router.get(
  "/:id",
  authMiddleware,
  authorizeMiddleware("manage_permission"),
  getPermissionById
);

router.put(
  "/:id",
  authMiddleware,
  authorizeMiddleware("manage_permission"),
  updatePermission
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeMiddleware("manage_permission"),
  deletePermission
);

module.exports = router;
