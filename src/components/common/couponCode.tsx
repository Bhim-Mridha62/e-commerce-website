import { notification } from "antd";
import React, { memo, useState } from "react";

const CouponCodeSection = memo(() => {
  const [couponCode, setCouponCode] = useState("");
  const HandelCouponCode = () => {
    notification[couponCode ? "error" : "warning"]({
      message: "Coupon Code",
      description: couponCode
        ? "Enter a valid coupon code"
        : "Coupon code cannot be empty",
    });
  };
  return (
    <>
      <hr className="my-2 border-theme-border" />
      <label className="">Do you have a coupon code?</label>
      <div className="flex mt-2 mb-3">
        <input
          type="text"
          placeholder="Enter coupon code"
          maxLength={10}
          className="border border-theme-border px-2 py-1 text-sm outline-none"
          onChange={(e) => setCouponCode(e?.target?.value)}
        />
        <button
          onClick={HandelCouponCode}
          className="bg-theme-black text-theme-white px-4 py-1 text-sm hover:opacity-90"
        >
          APPLY
        </button>
      </div>
      <hr className="my-2 border-theme-border" />
    </>
  );
});

export default CouponCodeSection;
