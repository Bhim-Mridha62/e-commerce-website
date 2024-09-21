import React, { useEffect, useState, useMemo } from "react";
import { Collapse, Modal, message, notification } from "antd";
import PriceDetails from "@/components/common/PriceDetails";
import DeliverDetails from "@/components/common/DeliverDetails";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { decodeData, encodeData } from "@/utils/client/encoding";
import { DeliveryAddressSchema } from "@/Schemas/client/FormSchema";
import { districts } from "@/utils/client/districts";
import { useAuthData } from "@/service/Auth";
import { FaCreditCard, FaLandmark, FaClock } from "react-icons/fa";
import { GiSmartphone } from "react-icons/gi";
import { CashOnDelivery } from "@/utils/client/svg-icon";
import { useUser } from "@/context/authContext";

const PaymentOptions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { postorder } = useAuthData();
  const router = useRouter();
  const { data, address } = router.query;
  const priceDetails = useMemo(() => decodeData(data as string), [data]);
  const [selectedOption, setSelectedOption] = useState("");
  const { user } = useUser();
  const decodedAddressDetails = useMemo(
    () => decodeData(address as any),
    [address]
  );
  const [addressDetails, setAddressDetails] = useState(decodedAddressDetails);

  useEffect(() => {
    if (decodedAddressDetails) {
      setAddressDetails(decodedAddressDetails);
    }
  }, [decodedAddressDetails]);

  const handleChange = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSubmit = (values: any) => {
    setAddressDetails(values);
    setIsModalVisible(false);

    // Encode the updated address details and update the URL
    const encodedAddress = encodeData(values);
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        address: encodedAddress,
      },
    });
  };
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
      let products = Array.isArray(priceDetails)
        ? priceDetails
        : [priceDetails];
      for (const product of products) {
        let orderData = {
          productID: product?._id,
          quantity: product?.quantity,
          title: product?.title,
          image: product?.thumbnail,
          price: product?.price,
          size: Array.isArray(priceDetails)
            ? product?.Size
            : product?.selectedSize,
          address: addressDetails,
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

      router.push("/myorder");
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
    <div className="md:w-[70%] mx-auto">
      <Collapse
        ghost
        items={[
          {
            key: "1",
            label: "Price Details",
            children: priceDetails ? (
              <PriceDetails productData={priceDetails} />
            ) : (
              <div>No Price Details yet</div>
            ),
          },
        ]}
      />
      <Collapse
        ghost
        items={[
          {
            key: "1",
            label: "Delivery Address",
            children: addressDetails ? (
              <DeliverDetails
                addressDetails={addressDetails}
                HandelChange={handleChange}
              />
            ) : (
              <div>Add address</div>
            ),
          },
        ]}
      />
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-6 space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Payment Options</h2>
          <p className="text-gray-600">
            Choose your preferred payment method to complete your purchase.
          </p>
        </div>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center p-2 md:p-4 border rounded-lg cursor-pointer transition-colors ${
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
                <div className="font-medium text-gray-700">{method.name}</div>
                <div className="text-sm text-gray-500">
                  {method.description}
                </div>
                {method.id != "cod" ? (
                  <div className="text-red-500">Not available</div>
                ) : (
                  ""
                )}
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="mt-8 space-y-4 px-4 md:px-0">
        <p className="text-sm text-gray-600">
          By selecting a payment method, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
        <button
          className={`mx-auto py-3 px-4 ${
            selectedOption !== "cod"
              ? "bg-gray-500 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              : "bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          }`}
          onClick={HandelConfirmOrder}
          disabled={isSubmitting || selectedOption !== "cod"}
        >
          CONFIRM ORDER
        </button>
      </div>
      {/* <div className="text-center my-5">
        <Button
          onClick={HandelConfirmOrder}
          disabled={isSubmitting}
          className=""
        >
          CONFIRM ORDER
        </Button>
      </div> */}
      {addressDetails && (
        <Modal
          title="Update Delivery Address"
          open={isModalVisible}
          onCancel={handleChange}
          footer={null}
        >
          <Formik
            initialValues={addressDetails || {}}
            validationSchema={DeliveryAddressSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-gray-700 font-semibold">
                    <span className="text-red-500">*</span> Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="text-gray-700 font-semibold"
                  >
                    <span className="text-red-500">*</span> Phone Number
                  </label>
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 "
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="alternatePhone"
                    className="text-gray-700 font-semibold"
                  >
                    Alternate Phone Number
                  </label>
                  <Field
                    type="text"
                    id="alternatePhone"
                    name="alternatePhone"
                    placeholder="Enter alternate phone number"
                    className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 "
                  />
                </div>
                <div>
                  <label
                    htmlFor="pincode"
                    className="text-gray-700 font-semibold"
                  >
                    <span className="text-red-500">*</span> Pin Code
                  </label>
                  <Field
                    type="text"
                    id="pincode"
                    name="pincode"
                    placeholder="Enter your pin code"
                    className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 "
                  />
                  <ErrorMessage
                    name="pincode"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="text-gray-700 font-semibold"
                  >
                    <span className="text-red-500">*</span> State
                  </label>
                  <Field
                    type="text"
                    id="state"
                    name="state"
                    placeholder="Enter your state"
                    className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 "
                  />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="district"
                    className="text-gray-700 font-semibold"
                  >
                    <span className="text-red-500">*</span> District
                  </label>
                  <Field
                    as="select"
                    id="district"
                    name="district"
                    className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 "
                  >
                    <option value="" disabled>
                      --- Select District ---
                    </option>
                    {districts?.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="district"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="village"
                    className="text-gray-700 font-semibold"
                  >
                    <span className="text-red-500">*</span> village
                  </label>
                  <Field
                    type="text"
                    id="village"
                    name="village"
                    placeholder="Enter your village"
                    className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 "
                  />
                  <ErrorMessage
                    name="village"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="buildingAddress"
                    className="text-gray-700 font-semibold"
                  >
                    Building Address
                  </label>
                  <Field
                    as="textarea"
                    id="buildingAddress"
                    name="buildingAddress"
                    placeholder="Enter your building address"
                    rows="3"
                    className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 "
                  />
                  <ErrorMessage
                    name="buildingAddress"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div className="mt-4 text-right">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save Address
                </button>
              </div>
            </Form>
          </Formik>
        </Modal>
      )}
    </div>
  );
};

export default PaymentOptions;
