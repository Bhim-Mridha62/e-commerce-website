import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import TimelineData from "./TimelineData";

import { useAuthData } from "@/service/Auth";
import OrderCard from "./OrderCard";
import { IOrder } from "@/types/types";
function MyOrderContent() {
  const [items, setItems] = useState<IOrder[]>([]);
  const { getorder } = useAuthData();
  useEffect(() => {
    getUserOrder();
  }, []);
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
  return (
    <div className="min-h-[30vh]">
      {items?.map((data: IOrder) => (
        <Collapse
          ghost
          items={[
            {
              showArrow: false,
              key: data?._id,
              label: <OrderCard key={data?._id} product={data} />,
              children: (
                <TimelineData StatusOrder={data} getUserOrder={getUserOrder} />
              ),
            },
          ]}
        />
      ))}
    </div>
  );
}

export default MyOrderContent;
