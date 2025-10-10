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
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeMiddleware = require("../middlewares/authorizeMiddleware");
const authorizeRole = require("../middlewares/authorizeRole");

// router
router.get("/allproduct", getAllProducts); //allow all
router.get("/:id", getProductById); //allow all

router.post(
  "/upload",
  authMiddleware,
  uploadProduct.single("product"),
  uploadImage
);
router.post(
  "/addproduct",
  authMiddleware,
  authorizeRole("staffProduct"),
  authorizeMiddleware("ADD_PRODUCT"),
  addProduct
);
router.put(
  "/:id/editproduct",
  authMiddleware,
  authorizeRole("staffProduct"),
  authorizeMiddleware("EDIT_PRODUCT"),
  editProduct
);
router.delete(
  "/:id/removeproduct",
  authMiddleware,
  authorizeRole("staffProduct"),
  authorizeMiddleware("delete_product"),
  removeProduct
);

module.exports = router;
