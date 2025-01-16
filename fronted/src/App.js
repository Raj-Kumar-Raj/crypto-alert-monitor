// frontend/src/App.js
import React from "react";
import PriceList from "./components/PriceList";
import AlertForm from "./components/AlertForm";

function App() {
  const apiUrl = "http://localhost:5000"; // Define your backend API URL

  return (
    <div className="App">
      <h1>Crypto Alert System</h1>
      <AlertForm />
      <PriceList apiUrl={apiUrl} /> {/* Pass the apiUrl as a prop */}
    </div>
  );
}

export default App;
