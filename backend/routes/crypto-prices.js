// backend/routes/crypto-prices.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Define the CoinGecko API endpoint for fetching crypto prices
const COIN_GECKO_API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";

// Endpoint to fetch cryptocurrency prices
router.get("/crypto-prices", async (req, res) => {
  try {
    const response = await axios.get(COIN_GECKO_API_URL); // Fetch data from CoinGecko API
    res.json(response.data); // Send the prices back to the frontend
  } catch (error) {
    console.error("Error fetching prices:", error);
    res.status(500).send("Error fetching cryptocurrency prices"); // Send error if the request fails
  }
});

module.exports = router;
