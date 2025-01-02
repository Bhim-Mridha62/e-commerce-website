import { encodeData } from "@/utils/client/encoding";
import { useRouter } from "next/router";
import React, { memo } from "react";
import CouponCodeSection from "../common/couponCode";
const CartProductPricingDetails = memo(
  ({ priceDetails }: { priceDetails: any }) => {
    const totalAmount = priceDetails?.reduce(
      (acc: number, item: any) => (acc + item?.price) * item?.quantity,
      0
    );
    const router = useRouter();
    const HandelCheckout = () => {
      const encodedQuery = encodeData(priceDetails as any);
      router?.push(`/checkout?data=${encodedQuery}`);
    };
    console.log(priceDetails, "Price Price Details");
    return (
      <div className="p-4 mt-8">
        <h2 className="text-lg font-semibold">Summary</h2>
        <CouponCodeSection />
        {priceDetails?.map((item: any) => (
          <div key={item?._id} className="flex flex-col gap-2">
            <div className="flex justify-between gap-2">
              <p>{item?.title}</p>
              <p>
                {item?.quantity === 1 ? "" : `(${item?.quantity}x)`}₹
                {item?.price * item?.quantity}
              </p>
            </div>
          </div>
        ))}
        <hr className="my-2 border-theme-border" />
        <div className="flex justify-between gap-2">
          <p>Shipping</p>
          <p className="text-theme-green">
            FREE <del className="text-theme-black">₹40</del>
          </p>
        </div>
        <hr className="my-2 border-theme-border" />
        <div className="flex justify-between gap-2">
          <span>All Taxs</span>
          <span>included</span>
        </div>
        <hr className="my-2 border-theme-border" />
        <div className="flex justify-between gap-2">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">₹{totalAmount}</span>
        </div>
        <button
          onClick={HandelCheckout}
          className="bg-theme-black text-theme-white w-full  py-2 text-center mt-4 hover:opacity-90 delay-150"
        >
          PROCEDE TO CHEKOUT
        </button>
      </div>
    );
  }
);

export default CartProductPricingDetails;
