import React, { memo } from "react";
import { BsChatLeftDots } from "react-icons/bs";
import { MdOutlineReport } from "react-icons/md";

const NeedHelp = memo(({ className }: { className?: string }) => {
  return (
    <div className={`rounded-md border ${className}`}>
      <div className="p-4">
        <h2 className="text-xl font-semibold">Need Help?</h2>
      </div>
      <div className="p-2 md:p-6">
        <div className="grid sm:grid-cols-2 gap-2 md:gap-4">
          <button className="flex items-center justify-center text-sm md:text-base gap-2 md:gap-4 border border-gray-300 text-theme-black font-semibold px-2 md:px-4 py-2 rounded-md hover:bg-gray-100">
            <BsChatLeftDots className="text-xl" />
            Contact Support
          </button>
          <button className="flex items-center justify-center text-sm md:text-base gap-2 md:gap-4 border border-gray-300 text-theme-black font-semibold px-2 md:px-4 py-2 rounded-md hover:bg-gray-100">
            <MdOutlineReport className="text-xl" />
            Report an Issue
          </button>
        </div>
      </div>
    </div>
  );
});

export default NeedHelp;
