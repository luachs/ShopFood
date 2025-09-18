const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/ControllerCategory");

// routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/create", createCategory);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
