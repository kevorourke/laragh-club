// "use client";
// import React, { useState, useCallback, useEffect } from "react";
// import { useSupabase } from "../supabase/SupabaseProvider";

// function LottoBalls() {
//   const [selectedNumbers, setSelectedNumbers] = useState([]);
//   const [drawData, setDrawData] = useState({});

//   const supabase = useSupabase();

//   const handleNumberClick = (number) => {
//     if (selectedNumbers.includes(number)) {
//       setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
//     } else if (selectedNumbers.length < 4) {
//       setSelectedNumbers([...selectedNumbers, number]);
//     }
//   };

//   const getLottoBalls = useCallback(async () => {
//     try {
//       // setLoading(true)

//       let { data, error, status } = await supabase.from("lotto_draws").select();

//       if (error && status !== 406) {
//         throw error;
//       }

//       if (data) {
//         console.log(data);
//         setDrawData(data);
//         // setFullname(data.full_name)
//         // setUsername(data.username)
//         // setWebsite(data.website)
//         // setAvatarUrl(data.avatar_url)
//       }
//     } catch (error) {
//       alert("Error loading user data!");
//     } finally {
//       // setLoading(false);
//     }
//   }, [supabase]);

//   const renderLottoBalls = () => {
//     const lottoBalls = [];
//     for (let i = 1; i <= 32; i++) {
//       const isSelected = selectedNumbers.includes(i);
//       lottoBalls.push(
//         <div
//           key={i}
//           className={`lotto-ball ${
//             isSelected ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
//           }`}
//           onClick={() => handleNumberClick(i)}
//         >
//           {i}
//         </div>
//       );
//     }
//     return lottoBalls;
//   };

//   useEffect(() => {
//     getLottoBalls();
//   }, [getLottoBalls]);

//   return (
//     <>
//       <div className="bg-white py-8 sm:py-8">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="mx-auto max-w-2xl lg:mx-0">
//             <p className="text-base font-semibold leading-7 text-indigo-600">
//               Get the help you need
//             </p>
//             <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
//               Support center
//             </h2>
//             <p className="mt-6 text-lg leading-8 text-gray-600">
//               Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
//               lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
//               fugiat aliqua.
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
//         <div className="px-4 py-5 sm:px-6">Ticket</div>
//         <div className="flex flex-wrap justify-center items-center px-4 py-5 sm:p-6">
//           {renderLottoBalls()}
//         </div>
//         <button
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={() => console.log(selectedNumbers)}
//         >
//           Submit
//         </button>
//       </div>
//     </>
//   );
// }

// export default LottoBalls;
// pages/index.js

"use client";
import { useState } from "react";
import { useSupabase } from "../supabase/SupabaseProvider";

export default function Home() {
  const [tickets, setTickets] = useState([[]]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const supabase = useSupabase();

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

  const handleSubmit = async () => {
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].length !== 4) {
        alert("Each ticket must have 4 numbers");
        return;
      }
    }

    const finalSubmit = tickets.map((ticket) => {
      return { name: name, phone: phone, ticket: ticket };
    });

    const { error } = await supabase.from("lotto_tickets").insert(finalSubmit);

    if (error) {
      alert("Error submitting tickets: " + error.message);
    } else {
      alert("Tickets submitted successfully");
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
        className="mb-2 px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline"
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
      <button
        onClick={() => setTickets([...tickets, []])}
        className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Ticket
      </button>
      <button
        onClick={handleSubmit}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </div>
  );
}
