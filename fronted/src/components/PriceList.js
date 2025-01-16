// frontend/src/components/PriceList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const PriceList = ({ apiUrl }) => {
  const [prices, setPrices] = useState({});
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    if (!apiUrl) {
      setError("API URL is undefined!");
      return;
    }

    // Fetch prices function
    const fetchPrices = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/crypto-prices`);
        setPrices(response.data);
        setError(null); // Clear error if the request is successful
      } catch (error) {
        setError("Failed to fetch cryptocurrency prices");
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices(); // Initial fetch
    const interval = setInterval(fetchPrices, 10000); // Fetch prices every 10 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [apiUrl]);

  return (
    <div>
      <h2>Crypto Prices</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      {Object.entries(prices).length > 0 ? (
        Object.entries(prices).map(([crypto, data]) => (
          <p key={crypto}>
            {crypto.toUpperCase()}: ${data.usd}
          </p>
        ))
      ) : (
        <p>Loading prices...</p>
      )}
    </div>
  );
};

export default PriceList;
