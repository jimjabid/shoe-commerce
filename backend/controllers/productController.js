import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@Description Fetch all Products
//@Route GET /api/products
//@Access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

//@Description Fetch  Product
//@Route GET /api/products/:id
//@Access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not Found");
  }
  res.json(product);
});

export { getProducts, getProductById };
