import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory,
  updateProductStatus,
  getProductsByUser
} from "../controllers/productController.js";
import { protectRoute } from "../middleware/auth.js";

const productRouter = express.Router();

// Public routes
productRouter.get("/", getAllProducts);
productRouter.get("/search", searchProducts);
productRouter.get("/category/:category", getProductsByCategory);
productRouter.get("/:id", getProductById);

// Protected routes (require authentication)
productRouter.post("/", protectRoute, createProduct);
productRouter.get("/user/my-products", protectRoute, getProductsByUser);
productRouter.put("/:id", protectRoute, updateProduct);
productRouter.patch("/:id/status", protectRoute, updateProductStatus);
productRouter.delete("/:id", protectRoute, deleteProduct);

export default productRouter;
