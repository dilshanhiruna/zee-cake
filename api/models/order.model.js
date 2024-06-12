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
  giftHampers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GiftHamper",
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
    required: false,
  },
  province: {
    type: String,
    required: false,
  },
  deliveryOption: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
