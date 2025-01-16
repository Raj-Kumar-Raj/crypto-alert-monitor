const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  crypto: { type: String, required: true },
  targetPrice: { type: Number, required: true },
  direction: { type: String, enum: ["above", "below"], required: true },
});

module.exports = mongoose.model("Alert", alertSchema);
