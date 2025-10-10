const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/ControllerCategory");

const authMiddleware = require("../middlewares/authMiddleware");
const authorizeMiddleware = require("../middlewares/authorizeMiddleware");
const authorizeRole = require("../middlewares/authorizeRole");

// 🟢 Routes
router.get("/", getAllCategories); // allow all
router.get("/:id", getCategoryById); // allow all

router.post(
  "/create",
  authMiddleware,
  authorizeRole("staffProduct"),
  authorizeMiddleware("add_category"),
  createCategory
);

// Update category → cần quyền edit_category
router.put(
  "/update/:id",
  authMiddleware,
  authorizeRole("staffProduct"),
  authorizeMiddleware("edit_category"),
  updateCategory
);

// Xóa category → cần quyền delete_category
router.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRole("staffProduct"),
  authorizeMiddleware("delete_category"),
  deleteCategory
);

module.exports = router;
