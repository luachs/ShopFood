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

// CRUD Role
router.post(
  "/",
  authMiddleware,
  authorizeMiddleware("manage_roles"),
  createRole
);

router.get("/", authMiddleware, authorizeMiddleware("manage_roles"), getRoles);

router.get(
  "/:id",
  authMiddleware,
  authorizeMiddleware("manage_roles"),
  getRoleById
);

router.put(
  "/:id",
  authMiddleware,
  authorizeMiddleware("manage_roles"),
  updateRole
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeMiddleware("manage_roles"),
  deleteRole
);

module.exports = router;
