import { IOrder } from "@/types/types";
import { GetOrderStatusColour } from "@/utils/client/colourCode";
import { formatDate } from "@/utils/client/formatDate";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { memo } from "react";

import ReactionButton from "./reactionButton";
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
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-xs md:text-base font-semibold">
              purchase item {product?.quantity}
            </p>
            <p className="text-xs md:text-base text-theme-text-grey">
              Oeder # {product?._id?.slice(0, 12)}
            </p>
          </div>
          <hr />
          <hr />
          <div className="flex justify-end">
            {/* <p className="text-xs md:text-base font-semibold">
            ₹ {product.price * product.quantity}
          </p> */}
            <p className="text-xs md:text-base text-theme-text-grey">
              Ship to {product?.address?.name}
            </p>
          </div>
          <div className="flex">
            <Image
              onClick={(e) => handelProductDetails(e)}
              className="md:w-48 md:h-48 w-20 h-20 object-cover rounded"
              src={product?.image || ""}
              alt={product?.title || ""}
              width={1000}
              height={1000}
            />
            <div className="ml-4">
              <h3 className="md:text-lg text-base font-[400] md:font-semibold text-gray-800 one-line-truncate">
                {product.title}
              </h3>
              <p className="text-theme-text-grey font-semibold mt-1">
                ₹{product.price}
              </p>
              <p className="flex items-center text-xs md:text-lg text-theme-text-grey">
                <span
                  className={`h-4 w-4  rounded-full mr-2`}
                  style={{
                    backgroundColor: orderStatusColour?.colour,
                    border: `4px solid ${orderStatusColour?.bgColour}`,
                  }}
                ></span>
                {product?.OrderStatus} on{" "}
                {formatDate(product?.DeliveryDate as string)}
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
