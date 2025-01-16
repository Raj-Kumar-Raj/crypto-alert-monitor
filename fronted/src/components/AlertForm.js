// frontend/src/components/AlertForm.js
import React, { useState } from "react";
import axios from "axios";

const AlertForm = ({ apiUrl }) => {
  const [formData, setFormData] = useState({
    userEmail: "",
    crypto: "",
    targetPrice: "",
    direction: "above",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    console.log("Form Data:", formData);
    if (!formData.userEmail || !formData.crypto || !formData.targetPrice) {
      setError("All fields are required!");
      return;
    }
    try {
      await axios.post(`http://localhost:5000/api/alerts`, formData);
      alert("Alert created successfully!");
      setFormData({
        userEmail: "",
        crypto: "",
        targetPrice: "",
        direction: "above",
      });
      setError("");
    } catch (err) {
      console.error("Error creating alert:", err);
      setError("Error creating alert");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="userEmail"
        placeholder="Email"
        onChange={handleChange}
        value={formData.userEmail}
      />
      <input
        name="crypto"
        placeholder="Crypto (e.g., bitcoin)"
        onChange={handleChange}
        value={formData.crypto}
      />
      <input
        name="targetPrice"
        placeholder="Target Price"
        onChange={handleChange}
        value={formData.targetPrice}
      />
      <select
        name="direction"
        onChange={handleChange}
        value={formData.direction}
      >
        <option value="above">Above</option>
        <option value="below">Below</option>
      </select>
      <button type="submit">Create Alert</button>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Show error message */}
    </form>
  );
};

export default AlertForm;
