import { Button, Collapse } from "antd";
import React, { useEffect, useState } from "react";
import TimelineData from "./TimelineData";

import { useAuthData } from "@/service/Auth";
import OrderCard from "./OrderCard";
import { getDayDifference } from "@/utils/client/formatDate";

function MyOrderContent() {
  const [items, setItems] = useState([]);
  const [statusOrder, setStatusOrder] = useState([]);
  const { getorder, putorder } = useAuthData();
  useEffect(() => {
    getUserOrder();
  }, []);
  const getUserOrder = async () => {
    try {
      let res = await getorder();
      if (res.status === 200) {
        setItems(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-[30vh]">
      {items?.map((data) => (
        <Collapse
          ghost
          items={[
            {
              showArrow: false,
              key: data?.key,
              label: <OrderCard key={data?.key} product={data} />,
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
