const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer/index");

const {
  uploadImage,
  addProduct,
  removeProduct,
  getAllProducts,
} = require("../controllers/ControllerProduct");

router.post("/upload", upload.single("product"), uploadImage);
router.post("/addproduct", addProduct);
router.post("/removeproduct", removeProduct);
router.get("/allproduct", getAllProducts);

module.exports = router;
