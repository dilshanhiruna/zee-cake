const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  link: { type: String, required: true },
  price: { type: Number, required: true },
  instructor: { type: String, required: true },
  image: { type: String },
});

const registrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  workshop: { type: mongoose.Schema.Types.ObjectId, ref: "Workshop" },
  attendees: { type: Number, required: true },
  paymentStatus: { type: String, default: "pending" },
});

const Workshop = mongoose.model("Workshop", workshopSchema);
const Registration = mongoose.model("WorkshopRegistration", registrationSchema);

module.exports = { Workshop, Registration };
