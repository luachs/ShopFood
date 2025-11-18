const Product = require("../models/core/product");
const Blog = require("../models/core/blog");

const controllerSearch = async (req, res) => {
  const q = req.query.q?.trim() || "";
  if (!q) return res.status(400).json({ message: "Thiếu từ khóa tìm kiếm" });

  try {
    const regex = new RegExp(q, "i");

    // === PAGINATION INPUT ===
    const productPage = parseInt(req.query.productPage) || 1;
    const blogPage = parseInt(req.query.blogPage) || 1;

    const productLimit = parseInt(req.query.productLimit) || 6;
    const blogLimit = parseInt(req.query.blogLimit) || 6;

    const productSkip = (productPage - 1) * productLimit;
    const blogSkip = (blogPage - 1) * blogLimit;

    // === PRODUCTS SEARCH ===
    const totalProducts = await Product.countDocuments({ name: regex });

    const products = await Product.find({ name: regex })
      .populate("category", "name")
      .skip(productSkip)
      .limit(productLimit);

    // === BLOG SEARCH ===
    const totalBlogs = await Blog.countDocuments({ title: regex });

    const blogs = await Blog.find({ title: regex })
      .skip(blogSkip)
      .limit(blogLimit);

    res.json({
      products: {
        data: products,
        pagination: {
          total: totalProducts,
          page: productPage,
          limit: productLimit,
          totalPages: Math.ceil(totalProducts / productLimit),
          hasNextPage: productPage < Math.ceil(totalProducts / productLimit),
          hasPrevPage: productPage > 1,
        },
      },
      blogs: {
        data: blogs,
        pagination: {
          total: totalBlogs,
          page: blogPage,
          limit: blogLimit,
          totalPages: Math.ceil(totalBlogs / blogLimit),
          hasNextPage: blogPage < Math.ceil(totalBlogs / blogLimit),
          hasPrevPage: blogPage > 1,
        }, 
      },
    });
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
