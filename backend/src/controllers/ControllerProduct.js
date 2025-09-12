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
};
