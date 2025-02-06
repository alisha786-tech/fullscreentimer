"use client";
import React, { useState, useEffect } from "react";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
import { FaPause } from "react-icons/fa6";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (time: any) => {
    const h = String(Math.floor(time / 3600)).padStart(2, "0");
    const m = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const s = String(time % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleRestart = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const handlePauseResume = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-black font-bold text-[13rem]">
        {formatTime(timeLeft ?? 0)}
      </h1>
      <h1 className="text-gray-800 font-normal text-7xl pt-3">
        /{formatTime(hours * 3600 + minutes * 60 + seconds)}
      </h1>

      <div className="mt-3 border border-gray-300 w-1/3 pb-8 text-center rounded-xl">
        <div className="bg-blue-500 text-white py-2 flex justify-center items-center rounded-t-xl">
          <IoMdArrowDropdown size={14} /> Settings
        </div>

        <h1 className="text-gray-800 text-lg pt-4">Countdown Time</h1>
        <div className="grid grid-cols-3 px-7 space-x-4 pt-4">
          {["H", "M", "S"].map((label, index) => (
            <div key={label} className="flex flex-col items-center">
              <h1 className="text-gray-800 font-bold">{label}:</h1>
              <input
                type="number"
                min="0"
                className="border border-gray-400 text-center rounded-lg py-2 w-full text-gray-500"
                value={index === 0 ? hours : index === 1 ? minutes : seconds}
                onChange={(e) => {
                  const value = Math.max(0, parseInt(e.target.value) || 0);
                  if (index === 0) setHours(value);
                  if (index === 1) setMinutes(value);
                  if (index === 2) setSeconds(value);
                }}
              />
            </div>
          ))}
        </div>
        <h1 className="text-gray-800 pt-6">
          Your logo URL(visible on the top)
        </h1>
        <div className="flex items-center px-5">
          <button className="border border-gray-400 focus:ring-1 focus:ring-blue-400 focus:shadow-2xl py-4 rounded-lg mt-3 w-[80%]"></button>
          <button className="border border-gray-400 focus:ring-1 focus:ring-blue-400 focus:shadow-2xl w-[20%] py-1 rounded-lg mt-2 px-2 text-gray-500">
            Set{" "}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-3 mt-3">
        <button
          onClick={handleRestart}
          className="flex items-center text-white bg-blue-600 rounded-md py-2 px-7 gap-2"
        >
          <VscDebugRestart size={20} /> Restart
        </button>
        <button
          onClick={handlePauseResume}
          className="flex items-center border border-gray-400 rounded-md"
        >
          <span className="text-gray-900 py-2 flex items-center px-5">
            {isRunning ? (
              <FaPause size={20} />
            ) : (
              <IoMdArrowDropright size={26} />
            )}{" "}
            {isRunning ? "Pause" : "Resume"}
          </span>
        </button>
      </div>
      {/* Footer */}
      <h1 className="text-gray-800 pt-[7rem] text-2xl font-medium">
        Large Online Timer
      </h1>
      <p className="text-gray-700 text-sm">
        Large timer with countdown feature. Ideal for exercise, meetings,
        meditation. More features coming soon.
      </p>
      <p className="text-gray-700 pt-2">
        Contact: fullscreentimercom@gmail.com
      </p>
    </div>
  );
};

export default Timer;
