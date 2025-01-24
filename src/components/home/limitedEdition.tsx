import Image from "next/image";
import React, { memo, useEffect, useState } from "react";
import Button from "../common/button";

const LimitedEdition = memo(() => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set the end time for the countdown (for example, 5 days, 23 hours, 59 minutes, 35 seconds from now)
  const endTime =
    new Date().getTime() +
    5 * 24 * 60 * 60 * 1000 + // 5 days
    23 * 60 * 60 * 1000 + // 23 hours
    59 * 60 * 1000 + // 59 minutes
    35 * 1000; // 35 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval); // Stop the timer when it reaches 0
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval when the component unmounts
  }, []);
  return (
    <div className="py-6 md:py-12 w-[90%] mx-auto border-b border-theme-border">
      <div className="bg-theme-black flex flex-col-reverse md:flex-row text-theme-white p-4">
        <div className="flex flex-col gap-3 md:gap-5 flex-1 mt-5 md:mt-0">
          <p className="text-lg md:text-xl font-semibold text-red-500">
            Limited Time Offer!
          </p>
          <h2 className="text-base md:text-lg">
            JBL Portable Waterproof Speaker
          </h2>
          <p className="text-gray text-sm md:text-base mdb:pr-4">
            Experience unbeatable sound quality and portability with the JBL
            Waterproof Speaker.
          </p>
          <div className="flex space-x-2">
            {/* Days */}
            <div className="flex flex-col items-center justify-center w-12 h-12 bg-theme-white text-theme-black rounded-full">
              <span className="text-xs font-semibold h-[12px]">
                {timeLeft.days}
              </span>
              <span className="text-[10px] font-medium">Days</span>
            </div>
            {/* Hours */}
            <div className="flex flex-col items-center justify-center w-12 h-12 bg-theme-white text-theme-black rounded-full">
              <span className="text-xs font-semibold h-[12px]">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] font-medium">Hours</span>
            </div>
            {/* Minutes */}
            <div className="flex flex-col items-center justify-center w-12 h-12 bg-theme-white text-theme-black rounded-full">
              <span className="text-xs font-semibold h-[12px]">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] font-medium">Minutes</span>
            </div>
            {/* Seconds */}
            <div className="flex flex-col items-center justify-center w-12 h-12 bg-theme-white text-theme-black rounded-full">
              <span className="text-xs font-semibold h-[12px]">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] font-medium">Seconds</span>
            </div>
          </div>

          <div>
            <Button
              className=""
              text="Buy Now"
              onClick={() => {
                console.log("click");
              }}
            ></Button>
          </div>
        </div>
        <div className="flex-1 mdb:p-5 flex justify-center items-center">
          <Image
            src="https://drive.google.com/thumbnail?id=1UxXGuNTFlT8xG1FoykbbQVH86T9LSfLo&sz=w1920"
            alt="Limited Time Offer"
            width={1000}
            height={1000}
            className="mdb:w-[80%] w-auto"
            style={{ filter: "drop-shadow(0px 0px 56px #ffffff85)" }}
          />
        </div>
      </div>
    </div>
  );
});

export default LimitedEdition;
