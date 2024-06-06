const express = require("express");
const router = express.Router();

const controller = require("../controllers/order.controller");

// Create a new order
router.post("/", controller.createOrder);

// Get all orders
router.get("/", controller.getAllOrders);

// Update order status
router.patch("/:orderId", controller.updateOrderStatus);

// Delete order
router.delete("/:orderId", controller.deleteOrder);

module.exports = router;
