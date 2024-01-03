const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  original_price: { type: Number },
  discounted_price: { type: Number },
  category_name: { type: String },
  is_stock: { type: Boolean },
  rating: { type: Number },
  reviews: { type: Number },
  description: { type: String },
  trending: { type: Boolean },
  size: { type: Number },
  img: { type: String },
});

module.exports = mongoose.model("products", productSchema);
