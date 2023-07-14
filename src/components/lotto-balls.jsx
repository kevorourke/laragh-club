"use client";
import React, { useState } from "react";

function LottoBalls() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const handleNumberClick = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else if (selectedNumbers.length < 4) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const renderLottoBalls = () => {
    const lottoBalls = [];
    for (let i = 1; i <= 32; i++) {
      const isSelected = selectedNumbers.includes(i);
      lottoBalls.push(
        <div
          key={i}
          className={`lotto-ball ${
            isSelected ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => handleNumberClick(i)}
        >
          {i}
        </div>
      );
    }
    return lottoBalls;
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex space-x-2">{renderLottoBalls()}</div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => console.log(selectedNumbers)}
      >
        Submit
      </button>
    </div>
  );
}

export default LottoBalls;
