import { useAuthData } from "@/service/Auth";
import { IOrder } from "@/types/types";
import { getDayDifference } from "@/utils/client/formatDate";
import { Modal, notification } from "antd";
import Link from "next/link";
import React, { memo, useState } from "react";
import { GiReturnArrow } from "react-icons/gi";
import { IoStarOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { TbReload } from "react-icons/tb";
const ReactionButton = memo(
  ({
    product,
    getUserOrder,
  }: {
    product: IOrder;
    getUserOrder: () => void;
  }) => {
    const [modalType, setModalType] = useState(""); // "cancel" or "return"
    const [cancelText, setCancelText] = useState("");
    const [isSubmitting, _] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
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
    const HandleCancelOrder = async () => {
      try {
        let res = await putorder({
          orderId: product?._id,
          orderStatus: modalType,
          cancelReason: cancelText,
          statusUpdate: {
            key: "Order_Delivered",
            value: modalType === "cancelled" ? "cancelled" : "Done",
          },
        });
        if (res?.status !== 200) {
          notification.error({
            message:
              modalType === "cancelled"
                ? "Order cancellation failed. Please try again."
                : "Unable to cancel the order at this time. Please try again later.",
          });
        } else {
          getUserOrder();
          setIsModalVisible(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    const showModal = (type: string) => {
      setModalType(type);
      setIsModalVisible(true);
    };
    return (
      <>
        <div className="flex gap-1 md:gap-4">
          <Link
            href={`/product/review?productId=${product?.productID}`}
            className="border border-theme-border px-1 md:px-4 py-2 rounded flex items-center justify-center gap-1 md:gap-2 font-medium text-xs md:text-base flex-1"
          >
            <IoStarOutline className="text-theme-blue inline-flex md:text-xl" />
            Write a Review
          </Link>
          <Link
            href={`/product/${product?.productID}`}
            className="border border-theme-border px-1 md:px-4 py-2 rounded flex items-center justify-center gap-1 md:gap-2 font-medium text-xs md:text-base flex-1"
          >
            <TbReload className="text-theme-blue inline-flex md:text-xl" />
            Buy Again
          </Link>
          {product?.OrderStatus === "pending" &&
            getDayDifference(
              product?.StatusOrder?.Order_Received?.time,
              new Date().toISOString()
            ) < 4 && (
              <button
                onClick={() => showModal("cancelled")}
                className="border border-theme-border px-1 md:px-4 py-2 rounded flex items-center justify-center gap-1 md:gap-2 font-medium text-xs md:text-base flex-1"
              >
                <RxCross2 className="text-theme-red inline-flex md:text-xl" />
                Cancle Order
              </button>
            )}
          {product?.OrderStatus === "Done" &&
            getDayDifference(
              product?.StatusOrder?.Order_Delivered?.time,
              new Date().toISOString()
            ) < 4 && (
              <button
                onClick={() => showModal("returned")}
                className="border border-theme-border px-1 md:px-4 py-2 rounded flex items-center justify-center gap-1 md:gap-2 font-medium text-xs md:text-base flex-1"
              >
                <GiReturnArrow className="text-theme-red inline-flex md:text-xl" />
                Return Order
              </button>
            )}
        </div>
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
              <div className="cancelReason">
                {cancelReasons.map((reason) => (
                  <div key={reason}>
                    <input
                      type="radio"
                      className="cursor-pointer"
                      value={reason}
                      onChange={(e) => setCancelText(e.target.value)}
                      name="cancelReason"
                      checked={cancelText === reason}
                    />{" "}
                    {reason} <br />
                  </div>
                ))}
              </div>
            ) : (
              <div className="cancelReason">
                {returnReasons.map((reason) => (
                  <div key={reason}>
                    <input
                      className="cursor-pointer"
                      type="radio"
                      value={reason}
                      onChange={(e) => setCancelText(e?.target?.value)}
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
      </>
    );
  }
);

export default ReactionButton;
