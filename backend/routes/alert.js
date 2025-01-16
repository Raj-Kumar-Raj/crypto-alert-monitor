// backend/routes/alert.js
const express = require("express");
const Alert = require("../models/Alert");

const router = express.Router();

// Create an alert
// backend/routes/alert.js
router.post("/", async (req, res) => {
  const { userEmail, crypto, targetPrice, direction } = req.body;

  // Basic validation
  if (!userEmail || !crypto || !targetPrice) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (isNaN(targetPrice)) {
    return res.status(400).json({ error: "Target price must be a number" });
  }

  try {
    console.log("Received data:", req.body);
    const alert = new Alert(req.body);
    await alert.save();
    res.status(201).json(alert); // Return the created alert as a response
  } catch (err) {
    console.error("Error creating alert:", err);
    res.status(500).json({ error: "Error creating alert" }); // Return a generic error message
  }
});

// Get all alerts
router.get("/", async (req, res) => {
  try {
    const alerts = await Alert.find(); // Retrieve all alerts from MongoDB
    res.json(alerts); // Send the alerts to the frontend
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle any server-side errors
  }
});

module.exports = router;
