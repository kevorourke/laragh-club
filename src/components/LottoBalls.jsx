"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useSupabase } from "../supabase/SupabaseProvider";

function LottoBalls() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [drawData, setDrawData] = useState({});

  const supabase = useSupabase();

  const handleNumberClick = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else if (selectedNumbers.length < 4) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const getLottoBalls = useCallback(async () => {
    try {
      // setLoading(true)

      let { data, error, status } = await supabase.from("lotto_draws").select();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log(data);
        setDrawData(data);
        // setFullname(data.full_name)
        // setUsername(data.username)
        // setWebsite(data.website)
        // setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      // setLoading(false);
    }
  }, [supabase]);

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

  useEffect(() => {
    getLottoBalls();
  }, [getLottoBalls]);

  return (
    <>
      <div className="bg-white py-8 sm:py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <p className="text-base font-semibold leading-7 text-indigo-600">
              Get the help you need
            </p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Support center
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">Ticket</div>
        <div className="flex flex-wrap justify-center items-center px-4 py-5 sm:p-6">
          {renderLottoBalls()}
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => console.log(selectedNumbers)}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default LottoBalls;
