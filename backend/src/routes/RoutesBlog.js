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

// router
router.post(
  "/upload",
  authMiddleware,
  uploadBlog.single("file"),
  uploadBlogImage
); //upload image

router.get("/", getBlogs); // allow all
router.get("/:id", getBlogById); // allow all

router.post("/", authMiddleware, authorizeMiddleware("add_blogs"), createBlog);
router.put(
  "/:id",
  authMiddleware,
  authorizeMiddleware("edit_blogs"),
  updateBlog
);
router.delete(
  "/:id",
  authMiddleware,
  authorizeMiddleware("delete_blogs"),
  deleteBlog
);

module.exports = router;
