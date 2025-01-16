// backend/server.js
require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const redisClient = require("./utils/redisClient"); // Redis client
const monitorPrices = require("./services/monitorPrices"); // Function to monitor crypto prices
const cryptoPricesRouter = require("./routes/crypto-prices");
const alertRoutes = require("./routes/alert"); // Import the alert routes

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" })); // Allow CORS for frontend requests

// Register the routes
app.use("/api", cryptoPricesRouter);
app.use("/api/alerts", alertRoutes); // Register alert routes

// Async function to initialize the server
async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // Connect to Redis
    await redisClient.connectRedis(); // Ensure Redis is connected before starting monitoring
    console.log("Redis connected");

    // Start monitoring prices
    monitorPrices(); // Call the function to start monitoring prices

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit with failure if any error occurs
  }
}

// Start the server
startServer();
