const port = 4000;
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");

const db = require("./src/config/db");
const upload = require("./src/middlewares/multer/index");
const Product = require("./src/models/index");

app.use(express.json());
app.use(cors());
app.use("/images", express.static("uploads/images"));

//routes
app.get("/", (req, res) => {
  res.send("Express App is running ");
});

// image storage engine
app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }
  res.json({
    success: true,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});
app.post("/addproduct", async (req, res) => {
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
});
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.json({
    success: "true",
    name: req.body.name,
  });
});
// create api for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({}); 
  console.log(products);
  res.send(products);
});

// listen
app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running localhost:${port} `);
  } else {
    console.log("Error:" + error);
  }
});
