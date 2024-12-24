import React, { memo, useEffect, useState } from "react";
import TimelineData from "./TimelineData";

import { useAuthData } from "@/service/Auth";
import OrderCard from "./OrderCard";
import { IOrder } from "@/types/types";
import { SearchIcon } from "@/utils/client/svg-icon";
import useIsMobile from "@/utils/client/isMobile";
import { useUser } from "@/context/authContext";
import EmptyOrder from "./emptyOrder";
const MyOrderContent = memo(() => {
  const [items, setItems] = useState<IOrder[]>([
    {
      address: {
        village: "M.v.48",
        alternatePhone: "",
        buildingAddress: "India",
        district: "Malkangiri",
        name: "Debasish Biswas",
        phone: "7683836438",
        pincode: "764047",
        state: "Odisha",
      },
      cancelReason: "",
      _id: "67589b05415d431b540826c9",
      productID: "6744d509fea2f23c11086a6d",
      quantity: 1,
      title: "Zara Basic Heavy Weight T-Shirt",
      size: "M",
      image:
        "https://drive.google.com/thumbnail?id=1bjNFTWYatCWYIJJtdAwekLQKqSikbpYL&sz=w1920",
      price: 1850,
      StatusOrder: {
        Order_Received: {
          status: "Done",
          time: "2024-12-11T01:18:21.273Z",
        },
        Order_Shipped: {
          status: "Done",
          time: "2024-12-11T01:20:24.169Z",
        },
        Order_Picked: {
          status: "InHere",
          time: "",
        },
        Out_for_delivery: {
          status: "pending",
          time: "",
        },
        Order_Delivered: {
          status: "pending",
          time: "",
        },
      },
      OrderStatus: "pending",
      DeliveryDate: "2024-12-11T01:20:24.169Z",
      OrderDate: "2024-12-10T19:48:21.343Z",
    },
  ]);
  const isMobile = useIsMobile();
  const [filterValue, setFilterValue] = useState<string>("All");
  const filterValueS = [
    "All",
    "Ordered",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Returned",
    "Exchange",
    "Others",
  ];
  // const [items, setItems] = useState<IOrder[]>([]);
  const { getorder } = useAuthData();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // getUserOrder();
    }
  }, [user]);
  const getUserOrder = async () => {
    try {
      let res = await getorder();
      if (res?.status === 200) {
        setItems(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(isMobile, "filterValue");

  return user ? (
    items?.length ? (
      <div className="min-h-[30vh]">
        <div className="mx-2 md:mx-20">
          <h1 className="text-xl font-semibold text-center my-4">My Orders</h1>
          <div className="relative mb-4 my-4">
            <input
              type="text"
              className="w-full md:w-1/2 border border-theme-text-grey text-theme-text-grey py-2 px-4 pl-10 rounded-md focus:outline-none"
              placeholder="Search by customer, product, or order ID"
            />
            <span className="absolute left-3 top-[0.7rem]">
              <SearchIcon className="size-5" />
            </span>
          </div>
          <div className="flex flex-wrap justify-start gap-2">
            {filterValueS.map((item: string) => (
              <button
                key={item}
                className={`order-filter-button ${
                  filterValue === item ? "active" : ""
                }`}
                onClick={() => setFilterValue(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <hr className="my-4" />
        </div>
        {items?.map((data: IOrder) => (
          <div className="flex gap-2 mb-8">
            <div className="w-full md:w-[70%] mx-4 md:ml-20">
              <OrderCard
                key={data?._id}
                product={data}
                getUserOrder={getUserOrder}
              />
            </div>
            {!isMobile && (
              <div className="w-[30%]">
                {" "}
                <TimelineData StatusOrder={data} getUserOrder={getUserOrder} />
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <EmptyOrder IsLogin={true} />
    )
  ) : (
    <EmptyOrder IsLogin={false} />
  );
});

export default MyOrderContent;
