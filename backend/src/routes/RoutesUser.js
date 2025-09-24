const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/authorizeMiddleware");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/controllerUser");

// 🟢 super_admin quản lý tất cả (user + admin)
router.post("/", authMiddleware, authorizeRole(["super_admin"]), createUser);
router.get("/", authMiddleware, authorizeRole(["super_admin"]), getAllUsers);
router.get("/:id", authMiddleware, authorizeRole(["super_admin"]), getUserById);
router.put("/:id", authMiddleware, authorizeRole(["super_admin"]), updateUser);
router.delete("/:id", authMiddleware, authorizeRole(["super_admin"]), deleteUser);

module.exports = router;
