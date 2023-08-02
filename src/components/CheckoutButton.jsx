"use client";

import axios from "axios";

function CheckoutButton() {
  // ...
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "/api/payment",
      {
        priceId: "price_1NafhfLJdJAdS6gPGLtWvYqS",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.assign(data);
  };
  // ...
  return <button onClick={handleSubmit}>Submit</button>;
}

export default CheckoutButton;
