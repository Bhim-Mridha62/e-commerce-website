import { useAuthData } from "@/service/Auth";
import { IOrder } from "@/types/types";
import { formatDate } from "@/utils/client/formatDate";
import Image from "next/image";
import React, { useState, useEffect, memo } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FiBox, FiCalendar } from "react-icons/fi";
import { HiOutlineTruck } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import { RiShoppingBag3Line } from "react-icons/ri";
import NeedHelp from "./needHelp";
import Loading from "../Loading/Loading";
import { GetOrderStatusColour } from "@/utils/client/colourCode";
const OrderDetails = memo(({ order_id }: { order_id?: string }) => {
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<IOrder | any>(null); // Replace `any` with proper types if desired
  const [activeStep, setActiveStep] = useState(0);
  const [order_colour, setorder_colour] = useState("#000000");
  const { getorder } = useAuthData();
  useEffect(() => {
    if (order_id) {
      fetchOrderDetails();
    }
  }, [order_id]);
  const fetchOrderDetails = async () => {
    const response = await getorder(order_id);
    setLoading(false);
    if (response?.data?.success) {
      const data = response?.data.data;
      setorder_colour(GetOrderStatusColour(data?.OrderStatus).colour);
      setOrderData(data);
      // Set active step based on order progress
      if (["Done", "returned"].includes(data?.OrderStatus)) {
        setActiveStep(5);
      } else {
        const steps = Object.keys(data.StatusOrder);
        steps.forEach((step, index) => {
          //@ts-ignore
          if (data?.StatusOrder[step]?.status == "InHere") {
            setActiveStep(index + 1);
          }
        });
      }
    }
  };

  if (loading) return <Loading />;

  const orderSteps = [
    {
      title: "Order Received",
      icon: AiOutlineCheckCircle,
      description: "Your order has been confirmed",
    },
    {
      title: "Order Shipped",
      icon: RiShoppingBag3Line,
      description: "Your order has been shipped",
    },
    {
      title: "Order Picked",
      icon: FiBox,
      description: "Package has been picked up by courier",
    },
    {
      title: "Out for Delivery",
      icon: HiOutlineTruck,
      description: "Your package is out for delivery",
    },
    {
      title: "Order Delivered",
      icon: AiOutlineCheckCircle,
      description: "Pending delivery confirmation",
    },
  ];
  return (
    <section className="mx-auto px-2 md:px-4 space-y-8 my-8 md:w-[80%]">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
          Order Details
        </h1>
        <p className="text-gray-600">
          Track your order status and manage your purchase
        </p>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <div className="bg-theme-grey border-b p-2 md:p-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-sm font-semibold text-theme-black mb-2">
                Purchase Item #{orderData?.quantity}
              </span>
              <h2 className="md:text-2xl font-bold">
                #{orderData?._id.slice(0, 10)}
              </h2>
              <p className="text-sm text-theme-text-grey">
                Ordered on {formatDate(orderData?.OrderDate)}
              </p>
            </div>
            <div className="text-right">
              <span
                className="inline-block px-3 py-[2px] text-[12px] font-semibold text-white rounded-full"
                style={{ background: order_colour }}
              >
                <FiBox className="inline-flex mb-1" />{" "}
                {orderSteps[activeStep - 1]?.title}
              </span>
              <p className="text-sm text-theme-text-grey mt-1">
                Est. {formatDate(orderData?.DeliveryDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 md:p-6 space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-theme-text-grey">
              <span>Order Received</span>
              <span>Order Delivered</span>
            </div>
            <div className="relative h-2 w-full bg-gray-200 rounded">
              <div
                className="absolute top-0 left-0 h-full rounded"
                style={{
                  width: `${(activeStep / orderSteps?.length) * 100}%`,
                  background: order_colour,
                }}
              ></div>
            </div>
          </div>

          <div className="bg-theme-grey border rounded p-4 space-y-4">
            <h3 className="font-semibold">
              <IoLocationOutline className="inline-flex mb-1" /> Shipping
              Address
            </h3>
            <div className="text-theme-text-grey">
              <p className="text-sm text-gray-600">
                {orderData?.address?.name}
              </p>
              {orderData?.address?.buildingAddress},{" "}
              {orderData?.address?.district}, {orderData?.address?.village} {""}
              ,{orderData?.address?.pincode}
            </div>
            <p className="text-sm text-gray-600 !mt-1">
              {orderData?.address?.phone}
            </p>
          </div>
          <div className="flex items-center gap-4 border border-theme-border">
            <div className="w-28 h-28 bg-gray-300 rounded overflow-hidden m-2">
              <Image
                src={orderData?.image}
                alt="Product"
                width={1000}
                height={1000}
                className="w-28 h-28 object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">{orderData?.title}</h3>
              <p className="text-gray-600">₹{orderData?.price}</p>
              <p className="text-sm text-gray-600">Size: {orderData?.size}</p>
              <p className="text-sm text-gray-600">
                Quantity: {orderData?.quantity}
              </p>
            </div>
          </div>

          <div className="">
            <div
              onClick={() => setIsProductDetailsOpen(!isProductDetailsOpen)}
              className="flex justify-between items-center cursor-pointer border border-theme-border bg-theme-grey mt-4 p-4 rounded"
            >
              <h3 className="font-semibold text-lg">Order Status</h3>
              <span className="text-theme-text-grey">
                {isProductDetailsOpen ? "▲" : "▼"}
              </span>
            </div>
            {isProductDetailsOpen && (
              <>
                <div className="space-y-4 relative">
                  <div className="absolute left-[0.8rem] md:left-[1.1rem] top-4 bottom-9 md:bottom-7 w-1 bg-gray-200">
                    <p
                      className={`w-ful`}
                      style={{
                        height:
                          activeStep === 2
                            ? "20%"
                            : activeStep === 3
                            ? "45%"
                            : activeStep === 4
                            ? "70%"
                            : "100%",
                        background: order_colour,
                      }}
                    />
                  </div>
                  {orderSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 relative"
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 md:h-10 md:w-10 rounded-full ${
                          index + 1 < activeStep || activeStep === 5
                            ? "bg-theme-black"
                            : index + 1 === activeStep
                            ? "bg-[#c7c7c7] border-2 border-theme-black"
                            : "bg-theme-grey"
                        }`}
                        style={{
                          background:
                            index + 1 < activeStep || activeStep === 5
                              ? order_colour
                              : "",
                          borderColor:
                            index + 1 === activeStep ? order_colour : "",
                        }}
                      >
                        <span
                          className="text-xl"
                          style={{
                            color:
                              index + 1 < activeStep || activeStep === 5
                                ? "var(--theme-white)"
                                : index + 1 === activeStep
                                ? "var(--theme-black)"
                                : "var(--theme-text-grey)",
                          }}
                        >
                          <step.icon />
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{step?.title}</h4>
                        <p className="text-sm text-theme-text-grey">
                          {formatDate(
                            orderData?.StatusOrder[
                              Object.keys(orderData?.StatusOrder)[index]
                            ].time
                          )}
                        </p>
                        <p className="text-theme-text-grey">
                          {step?.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border border-theme-border p-4 rounded-md flex justify-between items-center bg-theme-grey mt-4">
                  <div className="flex gap-2 items-center">
                    <FiCalendar />
                    <div>
                      <p>Estimated Delivery</p>
                      <p className="text-theme-text-grey">
                        {formatDate(orderData?.DeliveryDate)}
                      </p>
                    </div>
                  </div>
                  <div
                    className="bg-white p-2 rounded"
                    title="Delivery: 9 AM - 5 PM"
                  >
                    <LuClock4 />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <NeedHelp />
    </section>
  );
});

export default OrderDetails;
