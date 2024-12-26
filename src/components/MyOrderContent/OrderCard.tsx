import { useAuthData } from "@/service/Auth";
import { IOrder } from "@/types/types";
import { GetOrderStatusColour } from "@/utils/client/colourCode";
import { formatDate, getDayDifference } from "@/utils/client/formatDate";
import { Modal, notification } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { memo, useState } from "react";
import { GiReturnArrow } from "react-icons/gi";
import { IoStarOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { TbReload } from "react-icons/tb";
const OrderCard = memo(
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
    const orderStatusColour = GetOrderStatusColour(product?.OrderStatus);
    const router = useRouter();
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

    const showModal = (type: string) => {
      setModalType(type);
      setIsModalVisible(true);
    };
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    // redirct to add review page
    const handelGiveRate = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      router.push(`/order/${product?.productID}`);
    };
    const handelProductDetails = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      router.push(`/product/${product?.productID}`);
    };
    return (
      <>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-xs md:text-base font-semibold">
              purchase item {product?.quantity}
            </p>
            <p className="text-xs md:text-base text-theme-text-grey">
              Oeder # {product?._id?.slice(0, 12)}
            </p>
          </div>
          <hr />
          <hr />
          <div className="flex justify-end">
            {/* <p className="text-xs md:text-base font-semibold">
            ₹ {product.price * product.quantity}
          </p> */}
            <p className="text-xs md:text-base text-theme-text-grey">
              Ship to {product?.address?.name}
            </p>
          </div>
          <div className="flex">
            <Image
              onClick={(e) => handelProductDetails(e)}
              className="md:w-48 md:h-48 w-20 h-20 object-cover rounded"
              src={product?.image || ""}
              alt={product?.title || ""}
              width={1000}
              height={1000}
            />
            <div className="ml-4">
              <h3 className="md:text-lg text:[15] font-[400] md:font-semibold text-gray-800 one-line-truncate">
                {product.title}
              </h3>
              <p className="text-gray-800 font-semibold mt-1">
                ₹{product.price}
              </p>
              <p className="flex items-center md:text-lg text-theme-text-grey">
                <span
                  className={`h-4 w-4  rounded-full mr-2`}
                  style={{
                    backgroundColor: orderStatusColour?.colour,
                    border: `4px solid ${orderStatusColour?.bgColour}`,
                  }}
                ></span>
                {product?.OrderStatus} on{" "}
                {formatDate(product?.DeliveryDate as string)}
              </p>
            </div>
          </div>
          <div className="flex gap-1 md:gap-4">
            <button
              onClick={(e) => handelGiveRate(e)}
              className="border border-theme-border px-1 md:px-4 py-2 rounded flex items-center justify-center gap-1 md:gap-2 font-medium text-xs md:text-base flex-1"
            >
              <IoStarOutline className="text-theme-blue inline-flex md:text-xl" />
              Write a Review
            </button>
            <button
              onClick={(e) => handelProductDetails(e)}
              className="border border-theme-border px-1 md:px-4 py-2 rounded flex items-center justify-center gap-1 md:gap-2 font-medium text-xs md:text-base flex-1"
            >
              <TbReload className="text-theme-blue inline-flex md:text-xl" />
              Buy Again
            </button>
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
            {product.OrderStatus === "Done" &&
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
export default OrderCard;
