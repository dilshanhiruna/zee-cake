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
  category: {
    type: String,
    required: true,
  },
  flavor: {
    type: String,
    required: true,
  },
  topping: {
    type: String,
    required: true,
  },
  topper: {
    type: String,
    required: false,
  },
  decoration: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  extraDetails: {
    type: String,
    required: false,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  prefferedContact: {
    type: String,
    required: true,
  },
  glutenFree: {
    type: Boolean,
    default: false,
  },
  vegan: {
    type: Boolean,
    default: false,
  },
  nutFree: {
    type: Boolean,
    default: false,
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
