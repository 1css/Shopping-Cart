import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./Routes/productRoutes.js";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();



const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api/products", productRoutes);

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});