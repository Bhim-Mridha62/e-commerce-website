import React from "react";
import { Button } from "antd";
import { useRouter } from "next/router";
import { encodeData } from "@/utils/client/encoding";

function PriceDetails({ productData }: { productData: any }) {
  const router = useRouter();
  const isAddress =
    router.pathname?.split("/")[2]?.toLocaleLowerCase() === "address";

  const products = Array.isArray(productData) ? productData : [productData];
  console.log(products, "PriceDetails");
  const totalItems = products?.length || 0;
  const totalPrice = products
    .reduce((acc, product) => acc + product.price * product.quantity, 0)
    .toFixed(0);
  const totalDiscount = products
    .reduce(
      (acc, product) =>
        acc +
        ((product.price * product.discountPercentage) / 100) * product.quantity,
      0
    )
    .toFixed(0);
  const totalAmount = (totalPrice - totalDiscount).toFixed(0);
  const totalSavings = totalDiscount;

  const handlePlaceOrder = () => {
    const encodedQuery = encodeData(products as any);
    router.push(`/cart/address?data=${encodedQuery}`);
  };

  return (
    <div className="max-w-md text-black mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Price Details</h2>
      </div>
      <div className="mb-2 flex justify-between">
        <span>Price ({totalItems} items)</span>
        <span>₹{totalPrice}</span>
      </div>
      <div className="mb-2 flex justify-between">
        <span>Discount</span>
        <span className="text-green-600">-₹{totalDiscount}</span>
      </div>
      <div className="mb-2 flex justify-between">
        <span>Delivery Charges</span>
        <span>
          <span className="line-through">₹{totalItems * 40}</span>
          <span className="text-green-600 ml-2">FREE Delivery</span>
        </span>
      </div>
      <hr className="my-2" />
      <div className="mb-4 flex justify-between">
        <span className="font-semibold">Total Amount</span>
        <span className="font-semibold">₹{totalAmount}</span>
      </div>
      <div className="mb-4 text-green-600">
        <span>You will save ₹{totalSavings} on this order</span>
      </div>
      {!isAddress && (
        <div className="flex justify-between items-center">
          <div>
            <span className="line-through text-gray-500">₹{totalPrice}</span>
            <span className="text-2xl text-green-600 font-semibold ml-2">
              ₹{totalAmount}
            </span>
          </div>
          <Button
            onClick={handlePlaceOrder}
            type="primary"
            className="bg-blue-400 text-black border-none rounded-md"
          >
            Place order
          </Button>
        </div>
      )}
    </div>
  );
}

export default PriceDetails;
