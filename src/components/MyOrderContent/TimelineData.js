import { Timeline } from "antd";
import React, { useEffect, useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { GiCancel } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
function TimelineData({ StatusOrder, StatusText }) {
  const getStatusTimelineItems = (statusOrder) => {
    return statusOrder.map((item, index) => {
      let color;
      let dot;
      let status = Object.values(item)[0];
      let statusText = Object.keys(item)[0].replaceAll("_", " ");
      if (status === "Done") {
        color = "#26a541";
        dot = <FaRegCircleCheck className="text-[17px]" />;
      } else if (status === "InHere") {
        color = "#26a541";
        dot = <FaShippingFast className="text-[17px]" />;
      } else if (status === "pending") {
        color = "#1677ff";
        dot = <MdAccessTime className="text-[17px]" />;
      } else if (status === "cancelled") {
        dot = <GiCancel className="text-[17px]" />;
        color = "#dc2626";
      }
      return {
        color: color,
        label: <span style={{ color: color }}>{item.time}</span>,
        children: <span style={{ color: color }}>{statusText}</span>,
        dot: dot,
      };
    });
  };

  return (
    <div className="min-h-[30vh]">
      <div className="text-black text-center text-xl font-medium mb-3">
        Order Status
      </div>
      <Timeline mode="left" items={getStatusTimelineItems(StatusOrder)} />
    </div>
  );
}

export default TimelineData;
