const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/controllerUser");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeMiddleware = require("../middlewares/authorizeMiddleware");

// 🟢 super_admin quản lý tất cả (user + admin)
router.post("/", authMiddleware, authorizeMiddleware("add_user"), createUser);
router.get(
  "/",
  authMiddleware,
  authorizeMiddleware("get_all_user"),
  getAllUsers
);
router.get(
  "/:id",
  authMiddleware,
  authorizeMiddleware("get_user"),
  getUserById
);
router.put(
  "/:id",
  authMiddleware,
  authorizeMiddleware("edit_user"),
  updateUser
);
router.delete(
  "/:id",
  authMiddleware,
  authorizeMiddleware("delete_user"),
  deleteUser
);

module.exports = router;
