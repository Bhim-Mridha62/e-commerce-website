import { Timeline } from "antd";
import React, { useEffect, useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { GiCancel } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
function TimelineData({ StatusOrder,StatusText }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "green";
      case "pending":
        return "blue";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusTimelineItems = (statusOrder) => {
    let isPending = false;
    let isCancelled = false;
    let pendingIndex = -1;
    let cancelledIndex = -1;

    statusOrder.forEach((item, index) => {
      const [_, value] = Object.entries(item)[0];
      if (value === "pending" && !isPending) {
        isPending = true;
        pendingIndex = index;
      }
      if (value === "cancelled") {
        isCancelled = true;
        cancelledIndex = index;
      }
    });

    return statusOrder.map((item, index) => {
      const [key, value] = Object.entries(item)[0];
      let color = getStatusColor(value);
      let dot = null;

      if (isCancelled) {
        if (index < cancelledIndex) {
          color = "green";
        } else {
          color = "red";
        }
      } else if (isPending) {
        if (index <= pendingIndex) {
          color = "green";
        } else {
          color = "blue";
        }
      }
      if (value === "cancelled" && index === cancelledIndex) {
        dot =<GiCancel />;
      }
      if (value === "cancelled" && index === cancelledIndex) {
        dot =<GiCancel />;
      }

      if (value === "pending" && index === pendingIndex) {
        dot = <FaShippingFast />;
      }

      return {
        color: color,
        label: (
          <span style={{ color: color === "green" ? "#26a541" : color === "red" ? "#dc2626" : "#3b82f6" }}>
            {item.time}
          </span>
        ),
        children: (
          <span style={{ color: color === "green" ? "#26a541" : color === "red" ? "#dc2626" : "#3b82f6" }}>
            {key.replace("_", " ").replace(/_/g, " ")}
          </span>
        ),
        dot: dot,
      };
    });
  };

  return (
    <div className="min-h-[30vh]">
      <div className="text-black text-center text-xl font-medium mb-3">Order Status</div>
      <Timeline mode="left" items={getStatusTimelineItems(StatusOrder)} />
    </div>
  );
}

export default TimelineData;
