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

// CRUD PermissionGroup
router.post(
  "/",
  authMiddleware,
  authorizeMiddleware("manage_permission_groups"),
  createPermissionGroup
);

router.get(
  "/",
  authMiddleware,
  authorizeMiddleware("manage_permission_groups"),
  getPermissionGroups
);

router.get(
  "/:id",
  authMiddleware,
  authorizeMiddleware("manage_permission_groups"),
  getPermissionGroupById
);

router.put(
  "/:id",
  authMiddleware,
  authorizeMiddleware("manage_permission_groups"),
  updatePermissionGroup
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeMiddleware("manage_permission_groups"),
  deletePermissionGroup
);

module.exports = router;
