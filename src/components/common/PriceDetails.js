import React from "react";
import { Button } from "antd";
import { useRouter } from "next/router";

function PriceDetails() {
  const router = useRouter();
  const IsAddress=router.pathname?.split("/")[2]?.toLocaleLowerCase()=="address";
  const HandelPlaceOrder = () => {
    router.push("/cart/address");
  };
  return (
    <div className="max-w-md text-black mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Price Details</h2>
      </div>
      <div className="mb-2 flex justify-between">
        <span>Price (2 items)</span>
        <span>₹3,198</span>
      </div>
      <div className="mb-2 flex justify-between">
        <span>Discount</span>
        <span className="text-green-600">-₹2,295</span>
      </div>
      <div className="mb-2 flex justify-between">
        <span>Delivery Charges</span>
        <span>
          <span className="line-through">₹80</span>
          <span className="text-green-600 ml-2">FREE Delivery</span>
        </span>
      </div>
      <hr className="my-2" />
      <div className="mb-4 flex justify-between">
        <span className="font-semibold">Total Amount</span>
        <span className="font-semibold">₹873</span>
      </div>
      <div className="mb-4 text-green-600">
        <span>You will save ₹2,325 on this order</span>
      </div>
      <div className={`${IsAddress ? "hidden" :"flex"} justify-between items-center `}>
        <div>
          <span className="line-through text-gray-500">3,198</span>
          <span className="text-2xl text-green-600 font-semibold ml-2">
            873
          </span>
        </div>
        <Button
          onClick={HandelPlaceOrder}
          type="primary"
          className="bg-blue-400 text-black border-none rounded-md"
        >
          Place order
        </Button>
      </div>
    </div>
  );
}

export default PriceDetails;
