import express from "express";
import { createOrder, getUserOrders, getOrderById, cancelOrder } from "../controllers/orderController.js";
import { protectRoute } from "../middleware/auth.js";

const orderRouter = express.Router();

// Protected routes - all require authentication
orderRouter.post("/", protectRoute, createOrder);
orderRouter.get("/my-orders", protectRoute, getUserOrders);
orderRouter.get("/:id", protectRoute, getOrderById);
orderRouter.patch("/:id/cancel", protectRoute, cancelOrder);

export default orderRouter;
