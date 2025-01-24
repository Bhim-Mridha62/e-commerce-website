import React, { useState, useEffect, useRef, memo } from "react";

interface CountdownProps {
  targetDate?: Date;
}

const Countdown: React.FC<CountdownProps> = memo(({ targetDate }) => {
  // Initialize targetDate once using useRef
  const targetDateRef = useRef<Date>(
    targetDate ? targetDate : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  );

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDateRef.current.getTime() - now;

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
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        clearInterval(interval); // Stop the countdown when it reaches zero
      }
    };

    // Update countdown immediately and then every second
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="flex justify-center items-center gap-1 text-theme-black ml-5">
      {/* Days */}
      <div className="text-center flex flex-col">
        <span className="text-[18px] font-bold mb-[-6px]">
          {timeLeft.days.toString().padStart(2, "0")}
        </span>
        <span className="text-[12px] text-theme-text-grey">Days</span>
      </div>
      {/* Separator */}
      <span className="text-theme-red font-bold text-2xl">:</span>

      {/* Hours */}
      <div className="text-center flex flex-col">
        <span className="text-[18px] font-bold mb-[-6px]">
          {timeLeft.hours.toString().padStart(2, "0")}
        </span>
        <span className="text-[12px] text-theme-text-grey">Hours</span>
      </div>
      {/* Separator */}
      <span className="text-theme-red font-bold text-2xl">:</span>

      {/* Minutes */}
      <div className="text-center flex flex-col">
        <span className="text-[18px] font-bold mb-[-6px]">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </span>
        <span className="text-[12px] text-theme-text-grey">Minutes</span>
      </div>
      {/* Separator */}
      <span className="text-theme-red font-bold text-2xl">:</span>

      {/* Seconds */}
      <div className="text-center flex flex-col">
        <span className="text-[18px] font-bold mb-[-6px]">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </span>
        <span className="text-[12px] text-theme-text-grey">Seconds</span>
      </div>
    </div>
  );
});

export default Countdown;
