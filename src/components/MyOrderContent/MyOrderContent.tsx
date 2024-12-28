import React, { memo, useEffect, useState } from "react";
import { useAuthData } from "@/service/Auth";
import OrderCard from "./OrderCard";
import { IOrder } from "@/types/types";
import { SearchIcon } from "@/utils/client/svg-icon";
import useIsMobile from "@/utils/client/isMobile";
import { useUser } from "@/context/authContext";
import EmptyOrder from "./emptyOrder";
const MyOrderContent = memo(() => {
  const [items, setItems] = useState<IOrder[]>([]);
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
      getUserOrder();
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
      <div className="mx-2 md:mx-10 mdb:mx-48 mb-8">
        <div className="">
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
          <div className="border border-theme-border rounded-md mt-5">
            <OrderCard
              key={data?._id}
              product={data}
              getUserOrder={getUserOrder}
            />
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
