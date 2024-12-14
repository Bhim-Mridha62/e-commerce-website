import { IOrder } from "@/types/types";
import { GetOrderStatusColour } from "@/utils/client/colourCode";
import { formatDate } from "@/utils/client/formatDate";
import { useRouter } from "next/router";
import React from "react";
const OrderCard = ({ product }: { product: IOrder }) => {
  const orderStatusColour = GetOrderStatusColour(product?.OrderStatus);
  const router = useRouter();
  const handelGiveRate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/order/${product?.productID}`);
  };
  const handelProductDetails = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    router.push(`/product/${product?.productID}`);
  };
  return (
    <>
      <div className="flex items-start justify-between p-1 md:px-52  md:border-gray-200 rounded-lg shadow-sm mb-4">
        <div className=" md:flex-row flex-col flex">
          <img
            onClick={(e) => handelProductDetails(e)}
            className="md:w-24 md:h-24 w-16 h-16 object-cover rounded"
            src={product.image}
            alt={product.title}
          />
          <div className="ml-4">
            <h3 className="md:text-lg text:[15] font-[400] md:font-semibold text-gray-800">
              {product.title}
            </h3>
            <p className="text-gray-800 font-semibold mt-1">₹{product.price}</p>
          </div>
        </div>
        <div className="">
          <p
            className={`flex items-center md:text-lg `}
            style={{ color: orderStatusColour }}
          >
            <span
              className={`h-3 w-3  rounded-full mr-2`}
              style={{ backgroundColor: orderStatusColour }}
            ></span>
            {product?.OrderStatus} on{" "}
            {formatDate(
              product?.DeliveryDate ? product?.DeliveryDate : product?.OrderDate
            )}
          </p>
          <p className="text-gray-500">
            Your item has been {product?.OrderStatus}
          </p>
          <button
            className="text-blue-600 mt-2"
            onClick={(e) => handelGiveRate(e)}
          >
            ★ Give Rate & Review Product
          </button>
        </div>
      </div>
    </>
  );
};
export default OrderCard;
