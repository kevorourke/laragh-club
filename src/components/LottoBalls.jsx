"use client";
import { useState } from "react";
import { useSupabase } from "../supabase/SupabaseProvider";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function Home() {
  const [tickets, setTickets] = useState([[]]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const supabase = useSupabase();
  const [error, setError] = useState("");

  const handleBallClick = (ticketIndex, ballNumber) => {
    let newTickets = [...tickets];

    if (!newTickets[ticketIndex].includes(ballNumber)) {
      if (newTickets[ticketIndex].length < 4) {
        newTickets[ticketIndex].push(ballNumber);
      }
    } else {
      newTickets[ticketIndex] = newTickets[ticketIndex].filter(
        (number) => number !== ballNumber
      );
    }

    setTickets(newTickets);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone) {
      setError("Name and phone number are required!");
      return;
    }

    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].length !== 4) {
        setError("Each ticket must have 4 numbers");
        return;
      }
    }

    const finalSubmit = tickets.map((ticket) => {
      return {
        name: name,
        phone: phone,
        ticket: ticket,
        id: uuidv4(),
        draw_id: 2,
      };
    });

    const { error: supabaseError } = await supabase
      .from("lotto_ticket")
      .insert(finalSubmit);
    if (supabaseError) {
      setError("Error submitting tickets: " + supabaseError.message);
      return;
    }
    const ids = finalSubmit.map((ticket) => {
      return ticket.id;
    });

    const { data, error: apiError } = await axios.post(
      "/api/payment",
      {
        items: [
          {
            price: "price_1NcYBDLJdJAdS6gP0g6Y0nHt",
            quantity: finalSubmit.length,
          },
        ],
        metadata: { ticket_ids: JSON.stringify(ids), product: "lotto" },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (apiError) {
      setError("Error getting stripe " + apiError.message);
      return;
    }

    window.location.assign(data);

    if (error) {
      alert("Error: " + error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      {/* Collect person's details */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="mb-2 px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline"
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="mb-2 px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline"
      />

      {/* List all tickets */}
      {tickets.map((ticket, ticketIndex) => (
        <div key={ticketIndex} className="mb-6 bg-white p-4 rounded shadow">
          <p className="text-lg font-semibold">Ticket #{ticketIndex + 1}</p>

          {/* Display 32 balls */}
          <div className="flex flex-wrap justify-center items-center mt-4">
            {[...Array(32).keys()].map((ballNumber) => (
              <div
                key={ballNumber}
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer mb-2 mr-2 
                            ${
                              ticket.includes(ballNumber + 1)
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-black"
                            }`}
                onClick={() => handleBallClick(ticketIndex, ballNumber + 1)}
              >
                {ballNumber + 1}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Buttons to add a new ticket and submit all tickets */}
      <div className="flex flex-row mb:flex-col justify-evenly">
        <button
          onClick={() => {
            let removeTicketArr = [...tickets];
            console.log(removeTicketArr);
            removeTicketArr.pop();
            console.log(removeTicketArr);
            setTickets(removeTicketArr);
          }}
          className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Remove Ticket
        </button>
        <button
          onClick={() => setTickets([...tickets, []])}
          className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Add Ticket
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Purchase
        </button>
      </div>
      {error && <div className="text-red-500 mt-3">{error}</div>}
    </div>
  );
}
