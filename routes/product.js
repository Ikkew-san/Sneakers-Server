// const jwt = require("jsonwebtoken");
const express = require("express");
const upload = require("../middleware/upload");
const router = express.Router();
const Product = require("../models/product");

// GET : All product
router.get("/all-product", async (req, res) => {
  const product = await Product.find();
  product.map((val) => {
    val.img = "http://localhost:8000" + val.img;
  });
  res.status(200).json(product);
});

// Get : is stock
router.get("/products", async (req, res) => {
  try {
    let { category_name, page, per_page, price, ratings } = req.query;

    if (category_name == undefined) category_name = [];
    if (price == undefined) price = [0, 0];

    let start_index = (page - 1) * parseInt(per_page);
    let end_index = start_index + parseInt(per_page);

    if (category_name.length == 0) {
      let products = await Product.find(
        { is_stock: true },
        {
          is_stock: 0,
          description: 0,
          trending: 0,
          __v: 0,
          category_name: 0,
        }
      );

      let max = products.reduce((prev, curr) => {
        return curr.discounted_price > prev.discounted_price ? curr : prev;
      }).discounted_price;

      price[0] != 0 && price[1] != 0
        ? (products = products.filter(
            ({ discounted_price }) => discounted_price >= price[0] && discounted_price <= price[1]
          ))
        : products;

      products = products.filter(({ rating }) => {
        return ratings ? rating >= ratings : rating > 0;
      });

      let total_products = products.length;

      data = products.slice(start_index, end_index);
      data.map((val) => {
        val.img = "http://localhost:8000" + val.img;
      });
      res.json({
        page: page,
        per_page: per_page,
        maxPrice: max,
        total_products: total_products,
        products: data,
      });
    } else if (category_name.length > 0) {
      let products = await Product.find(
        { is_stock: true, category_name },
        {
          is_stock: 0,
          description: 0,
          trending: 0,
          __v: 0,
          category_name: 0,
        }
      );

      let max = products.reduce((prev, curr) => {
        return curr.discounted_price > prev.discounted_price ? curr : prev;
      }).discounted_price;

      price[0] != 0 && price[1] != 0
        ? (products = products.filter(
            ({ discounted_price }) => discounted_price >= price[0] && discounted_price <= price[1]
          ))
        : products;

      products = products.filter(({ rating }) => {
        return ratings ? rating >= ratings : rating > 0;
      });

      let total_products = products.length;
      data = products.slice(start_index, end_index);
      data.map((val) => {
        val.img = "http://localhost:8000" + val.img;
      });
      res.json({
        page: page,
        per_page: per_page,
        maxPrice: max,
        total_products: total_products,
        products: data,
      });
    } else console.log(error);
  } catch (error) {
    console.log(error);
  }
});

// Get: ID product
router.get("/products/:_id", async (req, res) => {
  const product = await Product.findById(req.params._id);
  product.img = "http://localhost:8000" + product.img;
  res.status(200).json(product);
});

// POST : Add product
router.post("/add-product", upload.single("img"), async (req, res) => {
  const { name, original_price, discounted_price, category_name, is_stock, description, trending } = req.body;
  const newProduct = new Product({
    name,
    original_price,
    discounted_price,
    category_name,
    is_stock,
    description,
    trending,
    img: "/" + req.file.destination + req.file.filename,
  });
  try {
    const isExisted = await Product.findOne({ name });
    if (isExisted) return res.status(400).send("product already registered");
    const product = await newProduct.save();
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// router.get("/", async (req, res) => {
//   const category_name = req.query.category_name;
//   if (category_name != "") {
//     const products = await Product.find(
//       { is_stock: true, category_name },
//       {
//         _id: 0,
//         name: 0,
//         category_name: 0,
//         original_price: 0,
//         is_stock: 0,
//         rating: 0,
//         reviews: 0,
//         description: 0,
//         trending: 0,
//         img: 0,
//         __v: 0,
//       }
//     );
//     res.json(products);
//   } else if (category_name == "") {
//     const products = await Product.find(
//       { is_stock: true },
//       {
//         _id: 0,
//         name: 0,
//         original_price: 0,
//         is_stock: 0,
//         rating: 0,
//         reviews: 0,
//         description: 0,
//         trending: 0,
//         img: 0,
//         __v: 0,
//       }
//     );
//     let price = [];
//     products.map(({ discounted_price }) => price.push(discounted_price));
//     res.json({
//       max: Math.max(...price),
//       min: Math.min(...price),
//     });
//   } else {
//     res.status(400);
//   }
// });

// router.get("/setdata", async (req, res) => {
//   // const data = new Product({
//   //   rating: products[0].rating,
//   //   reviews: products[0].reviews,
//   //   size: products[0].size,
//   // });
//   // console.log(data);
//   // // let test = [];
//   products.map(async (val) => {
//     const product = await Product.findOne({ name: val.name });
//     console.log(product._id);
//     const result = await Product.updateOne(
//       { _id: product._id },
//       {
//         $inc: {
//           rating: val.rating,
//           reviews: val.reviews,
//           size: val.size,
//         },
//       }
//     );
//     console.log(result);
//     //   const product = await Product.findOne({ name: val.name });
//     //   console.log(index + 1 + ": " + product.name);
//     //   //   test.push(index + 1 + ": " + product.name);
//     // console.log({ name: val.name });
//   });
// });

module.exports = router;
