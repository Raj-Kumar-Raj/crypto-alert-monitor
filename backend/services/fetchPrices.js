const axios = require("axios");

const fetchCryptoPrices = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    );
    return response.data; // Example response: { bitcoin: { usd: 30000 }, ethereum: { usd: 2000 } }
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    throw error;
  }
};

module.exports = fetchCryptoPrices;
