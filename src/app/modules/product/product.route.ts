import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

// Create a New Product
router.post("/", ProductControllers.createProduct);
// Retrieve a List of All Products
router.get("/", ProductControllers.getAllProducts);
// Retrieve a Specific Product by ID
router.get("/:productId", ProductControllers.getProductById);
// Update Product Information
router.put("/:productId", ProductControllers.updateProductById);
// Delete a Product
router.delete("/:productId", ProductControllers.deleteProductById);

export const ProductRoutes = router;
