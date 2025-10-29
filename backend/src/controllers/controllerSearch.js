const Product = require("../models/core/product");
const Category = require("../models/core/category");
const Blog = require("../models/core/blog");

const controllerSearch = async (req, res) => {
  const q = req.query.q?.trim() || "";
  if (!q) return res.status(400).json({ message: "Thiếu từ khóa tìm kiếm" });

  try {
    const regex = new RegExp(q, "i"); // tìm không phân biệt hoa thường

    // 🔸 Tìm sản phẩm (tên, mô tả)
    const products = await Product.find({ name: regex })
      .populate("category", "name") // lấy thêm tên danh mục
      .limit(10);

    // 🔸 Tìm danh mục (tên, mô tả)
    const categories = await Category.find({ name: regex }).limit(10);

    // 🔸 Tìm blog (tiêu đề, nội dung)
    const blogs = await Blog.find({ title: regex }).limit(10);

    let productsByCategory = [];
    if (categories.length > 0) {
      const catIds = categories.map((c) => c._id);
      productsByCategory = await Product.find({ category: { $in: catIds } })
        .populate("category", "name")
        .limit(20);
    }

    const combinedProducts = [
      ...products,
      ...productsByCategory.filter(
        (p) => !products.some((item) => item._id.equals(p._id))
      ),
    ];
    res.json({ products: combinedProducts, categories, blogs });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Lỗi khi tìm kiếm" });
  }
};

const controllerSearchSuggest = async (req, res) => {
  const q = req.query.q?.trim() || "";
  if (!q) return res.status(400).json({ message: "Thiếu từ khóa tìm kiếm" });

  try {
    const regex = new RegExp(q, "i");

    const products = await Product.find({ name: regex })
      .select("id name image price")
      .populate("category")
      .limit(5);
    res.json({ products });
  } catch (error) {
    console.error("❌ Lỗi tìm kiếm gợi ý:", error);
    res.status(500).json({ message: "Lỗi server khi tìm kiếm gợi ý" });
  }
};

module.exports = {
  controllerSearch,
  controllerSearchSuggest,
};
