import { IReviewStars } from "@/types/types";
import { getRatingColourText } from "@/utils/client/colourCode";
import React, { memo } from "react";
import { GoStarFill } from "react-icons/go";

const ReviewStarComponents = memo(({ stars }: { stars: IReviewStars }) => {
  return (
    <div className="flex items-start gap-2 md:gap-8 mb-3 pb-3 lg:pr-12 border-b">
      <div className="text-center">
        <div className="md:text-4xl text-2xl font-bold text-[#06a759]">
          {stars?.averageRating}{" "}
          <GoStarFill className="inline-flex text-base mb-3" />
        </div>
        <div className="text-sm text-theme-text-grey">
          {stars?.totalRatings} Ratings
        </div>
      </div>
      <div className="flex-1 space-y-2">
        {Object?.entries(stars)
          .filter(([key]) => key.includes("_star"))
          .reverse()
          .map(([key, value], index) => (
            <div key={key} className="flex items-center gap-2">
              <div className="text-xs font-semibold text-[#353543] w-16">
                {getRatingColourText(5 - index).text}
              </div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${value}%`,
                    backgroundColor: getRatingColourText(5 - index).colorCode,
                  }}
                />
              </div>
              <div className="text-sm text-theme-text-grey w-8">
                {value as number}%
              </div>
            </div>
          ))}
      </div>
    </div>
  );
});

export default ReviewStarComponents;
