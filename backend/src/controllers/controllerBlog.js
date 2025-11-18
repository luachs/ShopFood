const Blog = require("../models/core/blog");
const { getSortOptions } = require("../utils/sortHelper");

const uploadBlogImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Tạo URL public để TinyMCE chèn vào content
    const imageUrl = `http://localhost:4000/${req.file.path.replace(
      /\\/g,
      "/"
    )}`;
    res.json({ location: imageUrl }); // TinyMCE yêu cầu trả về {location: "url"}
  } catch (err) {
    console.error("Upload Blog Image Error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};

// Create
const createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /blogs?page=1&limit=6
const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    // Lấy sort từ FE
    const sortField = req.query.sortField || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    // Tạo sortOption
    const sortOption = { [sortField]: sortOrder };

    const [blogs, totalItems] = await Promise.all([
      Blog.find().sort(sortOption).skip(skip).limit(limit),
      Blog.countDocuments(),
    ]);

    res.json({
      data: blogs,
      pagination: {
        currentPage: page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        hasNextPage: page * limit < totalItems,
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  uploadBlogImage,
};
