"use client";

import axios from "axios";
import { useState, useEffect } from "react";

function CheckoutButton({ members }) {
  const [adultCount, setAdultCount] = useState();
  const [childCount, setChildCount] = useState();
  const [playingAdultCount, setPlayingAdultCount] = useState();

  useEffect(() => {
    let [adultCountA, childCountA, playingAdultCountA] = [0, 0, 0];

    members.forEach((member) => {
      if (!member.payment_due) {
        return;
      }
      if (!member.adult) {
        childCountA = childCountA + 1;
      } else if (member.player === "yes") {
        playingAdultCountA = playingAdultCountA + 1;
      } else {
        adultCountA = adultCountA + 1;
      }
    });
    setAdultCount({
      price: "price_1NbQY2LJdJAdS6gP1KR3a4yJ",
      quantity: adultCountA,
    });
    setChildCount({
      price: "price_1NbQXcLJdJAdS6gPNOUCWpEJ",
      quantity: childCountA,
    });
    setPlayingAdultCount({
      price: "price_1NbQX1LJdJAdS6gP3ii4bnc1",
      quantity: playingAdultCountA,
    });
    fetchPrices();
  }, [members]);

  const fetchPrices = async () => {
    const { data } = await axios.get("/api/getproducts");
    // setPrices(data)
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let itemsArray = [];
    if (adultCount.quantity > 0) {
      itemsArray.push(adultCount);
    }
    if (childCount.quantity > 0) {
      itemsArray.push(childCount);
    }
    if (playingAdultCount.quantity > 0) {
      itemsArray.push(playingAdultCount);
    }

    const { data } = await axios.post(
      "/api/payment",
      {
        items: itemsArray,
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
  return (
    <>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default CheckoutButton;
