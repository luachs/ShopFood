const Product = require("../models/product");

// Upload image
const uploadImage = (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }
  res.json({
    success: true,
    image_url: `http://localhost:4000/images/${req.file.filename}`,
  });
};
// add product
const addProduct = async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    createAt: req.body.createAt,
  });
  console.log(product);
  await product.save();
  console.log("saved!");
  res.json({
    success: true,
    name: req.body.name,
  });
};

// Remove product
const removeProduct = async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
};
const editProduct = async (req, res) => {
  try {
    const { id, name, price, category, description, image } = req.body;

    const updated = await Product.findByIdAndUpdate(
      id,
      { name, price, category, description, image },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    res.json({ message: "Cập nhật thành công", product: updated });
  } catch (error) {
    console.error("Lỗi edit product:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Không tìm thấy" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  let products = await Product.find({});
  res.json(products);
};

module.exports = {
  uploadImage,
  addProduct,
  removeProduct,
  getAllProducts,
  editProduct,
  getProductById,
};
