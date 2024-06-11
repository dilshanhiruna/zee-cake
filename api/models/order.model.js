const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cakes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cake",
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  deliveryOption: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
