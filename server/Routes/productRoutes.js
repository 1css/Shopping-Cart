import express from "express";
import Product from "../models/models.js";
import upload from "../upload.js"; // Import multer config

const router = express.Router();

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ available: true });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Add a new product with image upload
const addProduct = async (req, res) => {
  try {
    const { name, price, available, quantity } = req.body;
    const image = req.file ? req.file.filename : null; // Get uploaded file

    // if (!image) {
    //   return res.status(400).json({ message: "Image is required" });
    // }

    const newProduct = new Product({ name, image, price, available, quantity });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Error adding product", error });
  }
};

// Function to get a single product
const getProductsbyid = async (req, res) => {
  try {
    const productId = req.params.product;
    const product = await Product.findById(productId);
    if (product) {
      if (product.available === true) {
        res.json(product);
      } else {
        res.status(403).json({ error: "Product is not available" });
      }
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Define routes
router.get("/all", getAllProducts);
router.post("/", upload.single("image"), addProduct); // Use multer for image upload
router.get("/:product", getProductsbyid);

export default router;
