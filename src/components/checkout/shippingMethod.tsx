import React, { memo, useState } from "react";
import { message, notification } from "antd";
import { useRouter } from "next/router";
import { useAuthData } from "@/service/Auth";
import { FaCreditCard, FaLandmark, FaClock } from "react-icons/fa";
import { GiSmartphone } from "react-icons/gi";
import { CashOnDelivery } from "@/utils/client/svg-icon";
import { useUser } from "@/context/authContext";
import { IAddress } from "@/types/types";
import { FormikProps } from "formik";
import PriceDetails from "../common/PriceDetails";
interface AddressFormProps {
  formik: FormikProps<IAddress>;
  priceDetails: any;
  isMobile: boolean;
  totalAmount: number;
}
const ShippingMethod = memo(
  ({ formik, priceDetails, isMobile, totalAmount }: AddressFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { postorder } = useAuthData();
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState("");
    const { user } = useUser();
    const HandelConfirmOrder = async () => {
      if (!user) {
        notification.error({ message: "Please login to proceed." });
        return;
      }
      if (selectedOption != "cod") {
        return message.info("Please select a payment method");
      }
      setIsSubmitting(true);
      try {
        for (const product of priceDetails) {
          let orderData = {
            productID: product?._id,
            quantity: product?.quantity,
            title: product?.title,
            image: product?.thumbnail,
            price: product?.price,
            size: Array.isArray(priceDetails)
              ? product?.Size
              : product?.selectedSize,
            address: formik?.values,
          };
          const res = await postorder(orderData);
          if (res?.status !== 201) {
            openNotificationWithIcon(
              "error",
              "Order Failed",
              "An error occurred while confirming your order. Please try again."
            );
            setIsSubmitting(false);
            return;
          }
        }
        openNotificationWithIcon(
          "success",
          "Order Confirmed",
          "Order confirmed! Thank you for your purchase."
        );

        router.push("/order");
      } catch (error) {
        openNotificationWithIcon(
          "error",
          "Order Failed",
          "An error occurred while confirming your order. Please try again."
        );
        setIsSubmitting(false);
      }
    };
    //@ts-ignore
    const openNotificationWithIcon = (type, message, description) => {
      //@ts-ignore
      notification[type]({
        message: message,
        description: description,
      });
    };
    const paymentMethods = [
      {
        id: "upi",
        name: "Pay by any UPI app",
        icon: <GiSmartphone className="w-6 h-6" />,
        description: "Fast and secure payment using your preferred UPI app",
      },
      {
        id: "card",
        name: "Credit / Debit / ATM Card",
        icon: <FaCreditCard className="w-6 h-6" />,
        description: "Add and secure cards as per RBI guidelines",
      },
      {
        id: "netbanking",
        name: "Net Banking",
        icon: <FaLandmark className="w-6 h-6" />,
        description:
          "This instrument has low success, use UPI or cards for better experience",
      },
      {
        id: "emi",
        name: "EMI (Easy Installments)",
        icon: <FaClock className="w-6 h-6" />,
        description: "Convert your purchase into easy monthly installments",
      },
      {
        id: "cod",
        name: "Cash on Delivery",
        icon: <CashOnDelivery className="w-8 h-8" />,
        description: "Pay when your order is delivered",
      },
    ];
    return (
      <>
        <div className="bg-theme-white py-4">
          <h2 className="text-xl font-bold text-theme-black mb-4">
            Shipping method{" "}
          </h2>
          {/* <p className="text-gray-600">
            Choose your preferred payment method to complete your purchase.
          </p> */}
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center p-2 border rounded-md cursor-pointer transition-colors ${
                  selectedOption === method.id
                    ? selectedOption != "cod"
                      ? "border-red-500 bg-red-50"
                      : "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="paymentOption"
                  value={method.id}
                  checked={selectedOption === method.id}
                  onChange={() => setSelectedOption(method.id)}
                  className="hidden"
                />
                <div className="flex-shrink-0 mr-4 text-gray-500">
                  {method.icon}
                </div>
                <div className="flex-grow">
                  <div className="font-medium text-theme-black">
                    {method.name}
                    {method.id != "cod" && (
                      <span className="text-red-500 mx-1">(Not available)</span>
                    )}
                  </div>
                  {/* <div className="text-sm text-gray-500">
                  {method.description}
                </div> */}
                </div>
              </label>
            ))}
          </div>
        </div>
        {isMobile && priceDetails[0] && (
          <PriceDetails
            priceDetails={priceDetails}
            totalAmount={totalAmount}
            showSummaryText={true}
            IsPromoCode
          />
        )}
        <button
          className={`mx-auto py-3 px-4 w-full text-white font-medium rounded-md bg-[#1773b0] hover:bg-[#105989]`}
          onClick={HandelConfirmOrder}
          disabled={isSubmitting || selectedOption !== "cod"}
        >
          CONFIRM ORDER
        </button>
      </>
    );
  }
);

export default ShippingMethod;
