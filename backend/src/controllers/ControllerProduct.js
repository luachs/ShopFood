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
// get /products/addproduct
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

// DELETE /products/:id/removeproduct
const removeProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      id: Number(req.params.id),
    });
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    res.json({ success: true, message: "Xóa sản phẩm thành công" });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

//  PUT /products/:id/editproduct
const editProduct = async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;

    const updated = await Product.findOneAndUpdate(
      { id: Number(req.params.id) }, // lấy id từ URL
      { name, price, category, description, image },
      { new: true }
    );
    console.log("Kết quả update:", updated);
    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    res.json({ message: "Cập nhật thành công", product: updated });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
    console.error("Lỗi edit product:", error);
  }
};

//  GET /products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: Number(req.params.id) });

    if (!product) return res.status(404).json({ message: "Không tìm thấy" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
// POST /products/allproduct
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
