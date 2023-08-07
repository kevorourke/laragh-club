"use client";

import axios from "axios";
import { useState, useEffect } from "react";

function CheckoutButton({ members }) {
  const [adultCount, setAdultCount] = useState();
  const [childCount, setChildCount] = useState();
  const [playingAdultCount, setPlayingAdultCount] = useState();
  const [metadata, setMetadata] = useState();
  const [cardData, setCardData] = useState();

  useEffect(() => {
    let [adultCountA, childCountA, playingAdultCountA] = [0, 0, 0];
    let metadataObj = { memberIds: [] };
    members.forEach((member, i) => {
      if (!member.payment_due) {
        return;
      }
      metadataObj.memberIds.push(member.id);

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
    metadataObj.memberIds = JSON.stringify(metadataObj.memberIds);
    metadataObj.product = "membership";
    setMetadata(metadataObj);
    setCardData([
      { name: "Adult Member", quantity: adultCountA },
      { name: "Child Member", quantity: childCountA },
      { name: "Playing Adult Member", quantity: playingAdultCountA },
    ]);
  }, []);

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
        metadata: metadata,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.assign(data);
  };
  console.log(cardData);

  return (
    <>
      <div>
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Payments Due
        </h3>
        {cardData ? (
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {cardData.map((item) => (
              <div
                key={item.name}
                className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
              >
                <dt className="truncate text-sm font-medium text-gray-500">
                  {item.name}
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  {item.quantity}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Pay membership
        </button>
      </div>
    </>
  );
}

export default CheckoutButton;
