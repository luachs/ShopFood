const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  updateCartItem,
  removeCart,
} = require("../controllers/controllerCart");
const authMiddleware = require("../middlewares/authMiddleware");

// router
router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, addToCart);
router.put("/:productId", authMiddleware, updateCartItem);
router.delete("/:productId", authMiddleware, removeCart);

module.exports = router;
