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
const checkUserManagePermission = require("../middlewares/checkUserManagePermission");

// 🟢 staffuser quản lý tất cả (user + admin)
router.post(
  "/",
  authMiddleware,
  checkUserManagePermission,
  authorizeMiddleware("add_user"),
  createUser
);
router.get(
  "/",
  authMiddleware,
  checkUserManagePermission,
  authorizeMiddleware("get_all_user"),
  getAllUsers
);
router.get(
  "/:id",
  authMiddleware,
  checkUserManagePermission,
  authorizeMiddleware("get_user"),
  getUserById
);
router.put(
  "/:id",
  authMiddleware,
  checkUserManagePermission,
  authorizeMiddleware("edit_user"),
  updateUser
);
router.delete(
  "/:id",
  authMiddleware,
  checkUserManagePermission,
  authorizeMiddleware("delete_user"),
  deleteUser
);

module.exports = router;
