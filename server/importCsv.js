import mongoose from "mongoose";
import fs from "fs";
import csvParser from "csv-parser";
import Product from "./models/models.js"; // Adjust the path if needed

// MongoDB Connection
const MONGO_URI = "mongodb://127.0.0.1:27017/shopping_cart"; // Update with your database name
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const importCSV = async (filePath) => {
  const products = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (row) => {
      // Ensure required fields exist
      if (!row.name || !row.price || !row.quantity) {
        console.warn("Skipping invalid row:", row);
        return;
      }

      // Convert fields if necessary
      products.push({
        name: row.name,
        image: row.image || null,
        price: parseFloat(row.price),
        available: row.available?.toLowerCase() === "true",
        quantity: parseInt(row.quantity),
      });
    })
    .on("end", async () => {
      try {
        await Product.insertMany(products);
        console.log("CSV data imported successfully!");
        mongoose.connection.close();
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    })
    .on("error", (error) => {
      console.error("Error reading CSV file:", error);
    });
};

// Run the import function with your CSV file path
importCSV("./shopping_cart.products.csv"); // Update with your CSV file path
