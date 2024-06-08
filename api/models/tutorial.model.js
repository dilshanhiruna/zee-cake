const mongoose = require("mongoose");

const tutorialchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Tutorial = mongoose.model("Tutorial", tutorialchema);

module.exports = Tutorial;
