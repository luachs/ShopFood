const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productScheme = new Schema({
  id: { type: Number, require: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    enum: ["fastfood", "snack", "drink", "other"],
    default: "other",
  },
  image: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
const Product = mongoose.model("Product", productScheme);
module.exports = Product;
