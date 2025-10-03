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

// 🟢 Routes
router.get("/", getAllCategories); // allow all
router.get("/:id", getCategoryById); // allow all

router.post(
  "/create",
  authMiddleware,
  authorizeMiddleware("add_category"),
  createCategory
);

// Update category → cần quyền edit_category
router.put(
  "/update/:id",
  authMiddleware,
  authorizeMiddleware("edit_category"),
  updateCategory
);

// Xóa category → cần quyền delete_category
router.delete(
  "/delete/:id",
  authMiddleware,
  authorizeMiddleware("delete_category"),
  deleteCategory
);

module.exports = router;
