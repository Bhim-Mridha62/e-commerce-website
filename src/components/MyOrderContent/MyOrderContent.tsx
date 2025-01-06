import React, { memo, useEffect, useState } from "react";
import { useAuthData } from "@/service/Auth";
import OrderCard from "./OrderCard";
import { IOrder } from "@/types/types";
import { SearchIcon } from "@/utils/client/svg-icon";
import { useUser } from "@/context/authContext";
import EmptyOrder from "./emptyOrder";
// import orderNotFound from "/order_not_found.png";
import Image from "next/image";
import NeedHelp from "./needHelp";
import Loading from "../Loading/Loading";
const MyOrderContent = memo(() => {
  const [order, setOrder] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [order_filter, setOrder_filter] = useState<IOrder[]>([]);
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
        setOrder(res?.data?.data);
        setOrder_filter(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handelFilterClick = (value: string) => {
    setFilterValue(value);

    if (value === "All" || value === "Ordered") {
      setOrder_filter(order); // Show all orders
    } else {
      const statusMap: Record<string, string> = {
        Cancelled: "cancelled",
        Delivered: "done",
        Returned: "returned",
        Shipped: "pending",
      };

      if (statusMap[value]) {
        const filteredOrders = order.filter(
          (o) => o.OrderStatus.toLowerCase() === statusMap[value]
        );
        setOrder_filter(filteredOrders);
      } else {
        setOrder_filter([]); // Clear the filter if no match is found
      }
    }
  };
  if (loading && user) {
    return <Loading className="mt-4" />;
  }
  if (!user) {
    return <EmptyOrder IsLogin={false} />;
  }
  if (!order?.length) {
    return <EmptyOrder IsLogin={true} />;
  }
  return (
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
              onClick={() => handelFilterClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <hr className="my-4" />
      </div>
      {order_filter.length ? (
        order_filter?.map((data: IOrder) => (
          <div className="border border-theme-border rounded-md mt-5">
            <OrderCard
              key={data?._id}
              product={data}
              getUserOrder={getUserOrder}
            />
          </div>
        ))
      ) : (
        <div>
          <Image
            src="/order_not_found.png"
            width={1000}
            height={1000}
            alt="Order Not Found"
            className="w-40 mx-auto"
          />
          <p className="text-center font-semibold">Orders not found</p>
        </div>
      )}
      <NeedHelp className="mt-4" />
    </div>
  );
});

export default MyOrderContent;
