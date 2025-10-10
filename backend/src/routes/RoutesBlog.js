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
const authorizeMiddleware = require("../middlewares/authorizeMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/authorizeRole");

// router
router.post(
  "/upload",
  authMiddleware,
  uploadBlog.single("file"),
  uploadBlogImage
); //upload image

router.get("/", getBlogs); // allow all
router.get("/:id", getBlogById); // allow all

router.post(
  "/",
  authMiddleware,
  authorizeRole("staffBlog"),
  authorizeMiddleware("add_blogs"),
  createBlog
);
router.put(
  "/:id",
  authMiddleware,
  authorizeRole("staffBlog"),
  authorizeMiddleware("edit_blogs"),
  updateBlog
);
router.delete(
  "/:id",
  authMiddleware,
  authorizeRole("staffBlog"),
  authorizeMiddleware("delete_blogs"),
  deleteBlog
);

module.exports = router;
