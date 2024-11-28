import React from "react";
import { BiSolidOffer } from "react-icons/bi";
import { FaTruck } from "react-icons/fa";

const WelcomeSection = () => {
  return (
    <div className="bg-theme-black py-2 text-theme-white text-xs lsm:text-sm">
      <div className="flex justify-between items-center py-1 px-1 lsm:px-4">
        {/* Left Side */}
        <span className="text-center md:text-left">
          Welcome to SD <span className="text-theme-red">Fashion Shop</span>
        </span>
        {/* Right Side */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-1 lsm:gap-4">
          {/* Track Order Section */}
          <div className="flex items-center gap-1">
            <FaTruck className="text-theme-grey" />
            <span>
              Track <span className="hidden lsm:contents">your</span> order
            </span>
          </div>

          {/* Divider */}
          <span className="text-theme-white">|</span>

          {/* Offers Section */}
          <div className="flex items-center gap-1">
            <BiSolidOffer className="text-theme-grey" />
            <span>All Offers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
