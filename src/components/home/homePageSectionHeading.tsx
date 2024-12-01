import { IHomePageSectionHeading } from "@/types/types";
import React from "react";
const HomePageSectionHeading: React.FC<IHomePageSectionHeading> = ({
  className,
  topHeading,
  bottomHeading,
}) => {
  return (
    <div className={`${className} mb-8`}>
      <p className="text-theme-red text-sm font-semibold flex items-center gap-2 mb-2">
        <span className="bg-theme-red h-[38px] inline-flex w-[8px] md:w-[13px] rounded-sm md:rounded"></span>{" "}
        {topHeading}
      </p>
      <h2 className="text-xl md:text-3xl font-bold"> {bottomHeading}</h2>
    </div>
  );
};

export default HomePageSectionHeading;
