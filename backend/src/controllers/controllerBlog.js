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

// Read all
const getBlogs = async (req, res) => {
  try {
    const sortOption = getSortOptions(req, "createdAt");
    const blogs = await Blog.find().sort(sortOption);
    res.json(blogs);
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
