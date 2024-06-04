const mongoose = require("mongoose");

const customCakeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
    required: true,
  },
  flavor: {
    type: String,
    required: true,
  },
  greeting: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

const CustomCake = mongoose.model("CustomCake", customCakeSchema);

module.exports = CustomCake;
