const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
});

const Cake = mongoose.model("Cake", cakeSchema);

module.exports = Cake;
