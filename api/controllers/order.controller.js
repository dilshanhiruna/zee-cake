const Order = require("../models/order.model");

exports.createOrder = async (req, res) => {
  try {
    const { cakes, quantity, price, user } = req.body;

    const order = new Order({
      cakes,
      quantity,
      price,
      user,
    });
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("cakes");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to get orders" });
  }
};

//update status of order
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
};

// delete order
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await Order.findByIdAndDelete(orderId);

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};