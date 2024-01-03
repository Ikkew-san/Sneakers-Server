const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userID: { type: String, unique: true },
  product: [],
});

module.exports = mongoose.model("cart", cartSchema);
