const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/controllerBlog");

router.post("/", createBlog); // Create
router.get("/", getBlogs); // Read all
router.get("/:id", getBlogById); // Read one
router.put("/:id", updateBlog); // Update
router.delete("/:id", deleteBlog); // Delete

module.exports = router;
