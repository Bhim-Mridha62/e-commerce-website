import { Timeline } from "antd";
import React, { memo } from "react";
import { GiCancel } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { formatDate } from "@/utils/client/formatDate";
import { IOrder } from "@/types/types";

const TimelineData = memo(
  ({
    StatusOrder,
    getUserOrder,
  }: {
    StatusOrder: IOrder;
    getUserOrder: () => void;
  }) => {
    // const [modalType, setModalType] = useState(""); // "cancel" or "return"

    const getStatusTimelineItems = (statusOrder: any) => {
      let timelineItems = [];

      for (const key in statusOrder) {
        if (Object.hasOwnProperty.call(statusOrder, key)) {
          const statusObj = statusOrder[key];
          let color;
          let dot;
          let statusText = statusObj.status;
          let DeliveryText = key?.replaceAll("_", " ");
          if (statusText === "Done") {
            color = "#26a541";
            dot = <FaRegCircleCheck className="text-[17px]" />;
          } else if (statusText === "InHere") {
            color = "#26a541";
            dot = <FaShippingFast className="text-[17px]" />;
          } else if (statusText === "pending") {
            color = "#1677ff";
            dot = <MdAccessTime className="text-[17px]" />;
          } else if (statusText === "cancelled") {
            color = "#dc2626";
            dot = <GiCancel className="text-[17px]" />;
          }
          timelineItems.push({
            color: color,
            label: (
              <span style={{ color: color }}>
                {statusObj?.time
                  ? formatDate(statusObj?.time)
                  : "Delivery date to be confirmed."}
              </span>
            ),
            children: <span style={{ color: color }}>{DeliveryText}</span>,
            dot: dot,
          });
        }
      }

      return timelineItems;
    };

    console.log(StatusOrder?.StatusOrder?.Order_Delivered.time, "StatusOrder");
    return (
      <div className="">
        <div className="text-black text-center text-xl font-medium mb-3">
          Order Status
        </div>
        <Timeline
          mode="left"
          items={getStatusTimelineItems(StatusOrder?.StatusOrder)}
        />
      </div>
    );
  }
);

export default TimelineData;
