const multer = require("multer");
const Product = require("../models/product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images/products-images/");
  },
  filename: function (req, file, cb) {
    const { category_name } = req.body;
    const uniqueSuffix = Date.now();
    cb(null, `image-${category_name}-${uniqueSuffix}.png`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
