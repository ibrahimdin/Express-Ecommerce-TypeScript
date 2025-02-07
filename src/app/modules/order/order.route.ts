import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

// Create a New Order
router.post("/", OrderControllers.createOrder);

// Retrieve All Orders
router.get("/", OrderControllers.getAllOrders);

export const OrderRoutes = router;
