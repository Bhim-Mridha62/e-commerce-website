import { Badge } from "antd";
import Image from "next/image";
import React, { memo } from "react";
import PromoCode from "./promoCode";
import { getNavbarHeight } from "@/utils/client/scrollDown";
const PriceDetails = memo(
  ({
    priceDetails,
    isSticky = false,
    totalAmount,
    showSummaryText = false,
    IsPromoCode = false,
  }: {
    priceDetails: any;
    isSticky?: boolean;
    totalAmount: number;
    showSummaryText?: boolean;
    IsPromoCode?: boolean;
  }) => {
    const navbarHeight = getNavbarHeight();
    return (
      <div
        className={`${isSticky ? "sticky" : ""} ${
          showSummaryText ? "mb-6" : "px-4 lsm:px-24 mdb:px-0 pt-4"
        }`}
        style={isSticky ? { top: `${navbarHeight}px` } : {}}
      >
        {showSummaryText && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Summary</h2>
          </div>
        )}
        {IsPromoCode && (
          <div className="mb-4">
            <PromoCode />
          </div>
        )}
        {priceDetails?.map((item: any) => (
          <div key={item?._id} className="flex flex-col gap-2">
            <div className="flex justify-between gap-2">
              <div className="flex gap-2">
                <Badge count={item?.quantity || 0} color="#707070">
                  <Image
                    src={item?.thumbnail}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-20 h-20 object-contain bg-theme-white border border-theme-text-grey p-1 rounded-md"
                  />
                </Badge>
                <p>{item?.title}</p>
              </div>
              <p>
                ₹
                {((item?.price * item?.discountPercentage) / 100 +
                  item?.price) *
                  item?.quantity}
              </p>
            </div>
            <div className="flex justify-between gap-2">
              <p>
                Subtotal <span>(-{item?.discountPercentage}% )</span>
              </p>
              <p>
                <span className="text-theme-green">
                  (-
                  {((item?.price * item?.discountPercentage) / 100) *
                    item?.quantity}
                  )
                </span>{" "}
                ₹{item?.price * item?.quantity}
              </p>
            </div>
            <div className="flex justify-between gap-2">
              <p>Shipping</p>
              <p className="text-theme-green">
                FREE <del className="text-theme-black">₹40</del>
              </p>
            </div>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between gap-2">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">₹{totalAmount}</span>
        </div>
      </div>
    );
  }
);

export default PriceDetails;
