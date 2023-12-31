import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

// here you are calling the routes and using the controller functions for cleaner code
// but also could have being written as below
// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     const products = await Product.find({});

//     res.json(products);
//   })
// );
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
