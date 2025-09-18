const Category = require("../models/category");

// GET /categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// GET /categories/:id
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(400).json({ message: "Không tìm thấy category" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// POST /categories/create
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    await newCategory.save();

    return res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// PUT /categories/update/:id
const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    res.json(category);
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy category" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// DELETE /categories/delete/:id
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy category" });
    }

    res.json({ message: "Xóa category thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
