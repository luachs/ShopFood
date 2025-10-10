// routes/roleRoutes.js
const express = require("express");
const router = express.Router();
const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require("../controllers/controllerRole");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeMiddleware = require("../middlewares/authorizeMiddleware");
const authorizeRole = require("../middlewares/authorizeRole");

// CRUD Role
router.post(
  "/",
  authMiddleware,
  authorizeRole("admin"),
  authorizeMiddleware("manage_roles"),
  createRole
);

router.get(
  "/",
  authMiddleware,
  authorizeRole("admin"),
  authorizeMiddleware("manage_roles"),
  getRoles
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRole("admin"),
  authorizeMiddleware("manage_roles"),
  getRoleById
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRole("admin"),
  authorizeMiddleware("manage_roles"),
  updateRole
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRole("admin"),
  authorizeMiddleware("manage_roles"),
  deleteRole
);

module.exports = router;
