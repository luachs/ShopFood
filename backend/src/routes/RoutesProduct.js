const express = require("express");
const router = express.Router();
const { uploadProduct } = require("../middlewares/multer");

const {
  uploadImage,
  addProduct,
  removeProduct,
  getAllProducts,
  getProductById,
  editProduct,
} = require("../controllers/ControllerProduct");

router.post("/upload", uploadProduct.single("product"), uploadImage);
router.post("/addproduct", addProduct);
router.delete("/:id/removeproduct", removeProduct);
router.get("/allproduct", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id/editproduct", editProduct);

module.exports = router;
