import { notification } from "antd";
import React, { memo, useState } from "react";

const PromoCode = memo(() => {
  const [promoCode, setPromoCode] = useState("");
  const HandelPromoCode = () => {
    notification[promoCode ? "error" : "warning"]({
      message: "Promo Code",
      description: promoCode
        ? "Enter a valid promo code"
        : "Promo code cannot be empty",
    });
  };
  return (
    <>
      <hr className="my-2 border-theme-border" />
      <label className="">Do you have a promo code?</label>
      <div className="flex mt-2 mb-3">
        <input
          type="text"
          placeholder="Enter promo code"
          maxLength={10}
          className="border border-theme-border px-2 py-1 text-sm outline-none"
          onChange={(e) => setPromoCode(e?.target?.value)}
        />
        <button
          onClick={HandelPromoCode}
          className="bg-theme-black text-theme-white px-4 py-1 text-sm hover:opacity-90"
        >
          APPLY
        </button>
      </div>
      <hr className="my-2 border-theme-border" />
    </>
  );
});

export default PromoCode;
