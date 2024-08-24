import { Button, Modal, Timeline } from "antd";
import React, { useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { GiCancel } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { formatDate, getDayDifference } from "@/utils/client/formatDate";
import { useAuthData } from "@/service/Auth";

function TimelineData({ StatusOrder, getUserOrder }) {
  const [cancelText, setCancelText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(""); // "cancel" or "return"
  const { putorder } = useAuthData();
  const cancelReasons = [
    "Ordered by Mistake",
    "Found a Better Price Elsewhere",
    "Shipping Time is Too Long",
    "Decided Not to Purchase",
    "Ordered the Wrong Item",
    "Duplicate Order",
    "Changed Shipping Address",
    "Found a Different Product",
  ];

  const returnReasons = [
    "Damaged Product",
    "Wrong Item Shipped",
    "Defective Product",
    "Poor Quality",
    "Not as Described",
    "Size/Color Issue",
    "Changed Mind",
    "Received Late",
    "Better Price Available",
  ];

  const getStatusTimelineItems = (statusOrder) => {
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

  const showModal = (type) => {
    setModalType(type);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const HandleCancelOrder = async () => {
    try {
      let res = await putorder({
        orderId: StatusOrder?._id,
        orderStatus: modalType,
        cancelReason: cancelText,
        statusUpdate: {
          key: "Order_Delivered",
          value: modalType === "cancelled" ? "cancelled" : "Done",
        },
      });
      getUserOrder();
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(StatusOrder?.StatusOrder?.Order_Delivered.time, "StatusOrder");
  return (
    <div className="min-h-[30vh]">
      <div className="text-black text-center text-xl font-medium mb-3">
        Order Status
      </div>
      <Timeline
        mode="left"
        items={getStatusTimelineItems(StatusOrder?.StatusOrder)}
      />
      {StatusOrder?.OrderStatus === "pending" &&
        getDayDifference(
          StatusOrder?.StatusOrder?.Order_Received?.time,
          new Date().toISOString()
        ) < 4 && (
          <div className="text-center">
            <Button onClick={() => showModal("cancelled")} danger ghost>
              Cancel Order
            </Button>
          </div>
        )}
      {StatusOrder?.OrderStatus === "Done" &&
        getDayDifference(
          StatusOrder?.StatusOrder?.Order_Delivered?.time,
          new Date().toISOString()
        ) < 4 && (
          <div className="text-center">
            <Button onClick={() => showModal("returned")} danger ghost>
              Return Order
            </Button>
          </div>
        )}
      {isModalVisible && (
        <Modal
          title={modalType === "cancelled" ? "Cancel Order" : "Return Order"}
          open={isModalVisible}
          onOk={HandleCancelOrder}
          onCancel={handleCancel}
          okButtonProps={{
            style: { background: "black", color: "white" },
            disabled: !cancelText,
          }}
          okText="Confirm"
          confirmLoading={isSubmitting}
        >
          {modalType === "cancelled" ? (
            <div
              className="cancelReason"
              onChange={(e) => setCancelText(e.target.value)}
            >
              {cancelReasons.map((reason) => (
                <div key={reason}>
                  <input
                    type="radio"
                    value={reason}
                    name="cancelReason"
                    checked={cancelText === reason}
                  />{" "}
                  {reason} <br />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="cancelReason"
              onChange={(e) => setCancelText(e.target.value)}
            >
              {returnReasons.map((reason) => (
                <div key={reason}>
                  <input
                    type="radio"
                    value={reason}
                    name="returnReason"
                    checked={cancelText === reason}
                  />{" "}
                  {reason} <br />
                </div>
              ))}
            </div>
          )}
          {modalType === "cancelled" && !cancelText && (
            <div style={{ color: "red", marginTop: "8px" }}>
              Please select a reason for cancellation
            </div>
          )}
          {modalType === "returned" && !cancelText && (
            <div style={{ color: "red", marginTop: "8px" }}>
              Please select a reason for return
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

export default TimelineData;
