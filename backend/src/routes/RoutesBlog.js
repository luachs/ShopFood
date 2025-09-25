const express = require("express");
const router = express.Router();
const { uploadBlog } = require("../middlewares/multer");
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  uploadBlogImage,
} = require("../controllers/controllerBlog");

router.post("/upload", uploadBlog.single("file"), uploadBlogImage); //upload image
router.post("/", createBlog); // Create
router.get("/", getBlogs); // Read all
router.get("/:id", getBlogById); // Read one
router.put("/:id", updateBlog); // Update
router.delete("/:id", deleteBlog); // Delete

module.exports = router;
