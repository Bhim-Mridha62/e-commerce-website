import { IOrder } from "@/types/types";
import { GetOrderStatusColour } from "@/utils/client/colourCode";
import { formatDate } from "@/utils/client/formatDate";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { memo } from "react";

import ReactionButton from "./reactionButton";
import { PiCaretCircleRight } from "react-icons/pi";
const OrderCard = memo(
  ({
    product,
    getUserOrder,
  }: {
    product: IOrder;
    getUserOrder: () => void;
  }) => {
    const orderStatusColour = GetOrderStatusColour(product?.OrderStatus);
    const router = useRouter();

    // redirct to add review page
    const handelProductDetails = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      router.push(`/product/${product?.productID}`);
    };
    return (
      <>
        <div className="bg-theme-grey flex justify-between px-2 md:px-4 py-4 items-center rounded-t-md">
          <div>
            {" "}
            <p className="text-xs md:text-base text-theme-text-grey">
              Oeder # {product?._id?.slice(0, 12)}
            </p>
            <p
              className="flex items-center text-sm md:text-base text-theme-text-grey rounded-full border w-fit px-2 mt-1"
              style={{
                color: orderStatusColour.colour,
                backgroundColor: orderStatusColour.bgColour,
                borderColor: orderStatusColour.colour,
              }}
            >
              <span
                className={`h-2 w-2  rounded-full mr-1`}
                style={{
                  backgroundColor: orderStatusColour?.colour,
                }}
              ></span>
              {product?.OrderStatus} on{" "}
              {formatDate(product?.DeliveryDate as string)}
            </p>
          </div>
          <div className="text-xs md:text-base text-theme-text-grey">
            Ship to {product?.address?.name}
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div
            className="flex"
            onClick={() => router.push(`/order/${product?._id}`)}
          >
            <Image
              className="md:w-48 md:h-48 w-20 h-20 object-cover rounded"
              src={product?.image || ""}
              alt={product?.title || ""}
              width={1000}
              height={1000}
            />
            <div className="ml-4 w-full">
              <h3 className="md:text-lg text-base font-[400] md:font-semibold text-gray-800 one-line-truncate">
                {product.title}
              </h3>
              <p className="text-theme-text-grey font-semibold mt-1 flex justify-between">
                ₹{product.price}
                <PiCaretCircleRight className="text-3xl" />
              </p>
            </div>
          </div>
          <ReactionButton
            product={product}
            getUserOrder={getUserOrder}
            handelProductDetails={handelProductDetails}
          />
        </div>
      </>
    );
  }
);
export default OrderCard;
