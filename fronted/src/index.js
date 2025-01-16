import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App";

// Establish connection with backend API
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

ReactDOM.render(
  <React.StrictMode>
    <App apiUrl={apiUrl} />
  </React.StrictMode>,
  document.getElementById("root")
);
