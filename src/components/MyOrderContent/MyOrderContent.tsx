import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import TimelineData from "./TimelineData";

import { useAuthData } from "@/service/Auth";
import OrderCard from "./OrderCard";
import { IOrder } from "@/types/types";
import { useUser } from "@/context/authContext";
import EmptyOrder from "./emptyOrder";
function MyOrderContent() {
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
  return user ? (
    items?.length ? (
      <div className="min-h-[30vh]">
        {items?.map((data: IOrder) => (
          <Collapse
            key={data?._id}
            ghost
            items={[
              {
                showArrow: false,
                key: data?._id,
                label: (
                  <OrderCard
                    key={data?._id}
                    product={data}
                    getUserOrder={getUserOrder}
                  />
                ),
                children: (
                  <TimelineData
                    StatusOrder={data}
                    getUserOrder={getUserOrder}
                  />
                ),
              },
            ]}
          />
        ))}
      </div>
    ) : (
      <EmptyOrder IsLogin={true} />
    )
  ) : (
    <EmptyOrder IsLogin={false} />
  );
}

export default MyOrderContent;
