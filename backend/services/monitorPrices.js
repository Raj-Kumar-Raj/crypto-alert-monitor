const redisClient = require("../utils/redisClient").client;
const fetchCryptoPrices = require("./fetchPrices"); // Import the function

const monitorPrices = async () => {
  setInterval(async () => {
    try {
      const prices = await fetchCryptoPrices(); // Fetch crypto prices
      await redisClient.set("cryptoPrices", JSON.stringify(prices), { EX: 60 }); // Cache in Redis
      console.log("Prices updated in Redis:", prices);
    } catch (error) {
      console.error("Error updating prices in Redis:", error);
    }
  }, 10000); // Fetch prices every 10 seconds
};

module.exports = monitorPrices;
