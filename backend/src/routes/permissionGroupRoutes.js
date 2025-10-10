// routes/permissionGroupRoutes.js
const express = require("express");
const router = express.Router();
const {
  createPermissionGroup,
  getPermissionGroups,
  getPermissionGroupById,
  updatePermissionGroup,
  deletePermissionGroup,
} = require("../controllers/controllerPermissionGroup");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeMiddleware = require("../middlewares/authorizeMiddleware");
const authorizeRole = require("../middlewares/authorizeRole");

// CRUD PermissionGroup
router.post(
  "/",
  authMiddleware,
  authorizeRole("admin"),
  authorizeMiddleware("manage_permission_groups"),
  createPermissionGroup
);

router.get(
  "/",
  authMiddleware,
  authorizeRole("admin"),
  authorizeMiddleware("manage_permission_groups"),
  getPermissionGroups
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRole("admin"),
  authorizeMiddleware("manage_permission_groups"),
  getPermissionGroupById
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRole("admin"),
  authorizeMiddleware("manage_permission_groups"),
  updatePermissionGroup
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRole("admin"),
  authorizeMiddleware("manage_permission_groups"),
  deletePermissionGroup
);

module.exports = router;
