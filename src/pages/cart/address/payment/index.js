import React, { useEffect, useState, useMemo } from "react";
import {
  Radio,
  Space,
  Divider,
  Collapse,
  Modal,
  message,
  notification,
  Button,
} from "antd";
import PriceDetails from "@/components/common/PriceDetails";
import DeliverDetails from "@/components/common/DeliverDetails";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { decodeData, encodeData } from "@/utils/client/encoding";
import { DeliveryAddressSchema } from "@/Schemas/client/FormSchema";
import { districts } from "@/utils/client/districts.js";
import { useAuthData } from "@/service/Auth";

const PaymentOptions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [payment, setPayment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { postorder } = useAuthData();
  const router = useRouter();
  const { data, address } = router.query;
  const priceDetails = useMemo(() => decodeData(data), [data]);

  const decodedAddressDetails = useMemo(() => decodeData(address), [address]);
  const [addressDetails, setAddressDetails] = useState(decodedAddressDetails);

  useEffect(() => {
    if (decodedAddressDetails) {
      setAddressDetails(decodedAddressDetails);
    }
  }, [decodedAddressDetails]);

  const handleChange = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSubmit = (values) => {
    setAddressDetails(values);
    console.log(values, "value");
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
    console.log(payment != "cod", payment);
    if (payment != "cod") {
      return message.info("Please select a payment method");
    }
    setIsSubmitting(true);
    console.log(priceDetails);
    let orderData = {
      productID: priceDetails?._id,
      quantity: priceDetails?.quantity,
      title: priceDetails?.title,
      image: priceDetails?.thumbnail,
      price: priceDetails?.price,
      size: priceDetails?.selectedSize,
      address: addressDetails,
    };
    try {
      const res = await postorder(orderData);
      console.log(res, "res");
      if (res?.status === 201) {
        openNotificationWithIcon(
          "success",
          "Order Confirmed",
          "Order confirmed! Thank you for your purchase."
        );
        router.push("/myorder");
      } else {
        openNotificationWithIcon(
          "error",
          "Order Failed",
          "An error occurred while confirming your order. Please try again."
        );
        setIsSubmitting(false);
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Order Failed",
        "An error occurred while confirming your order. Please try again."
      );
      setIsSubmitting(false);
    }
  };
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };
  const HandelPaymentOption = (e) => {
    setPayment(e?.target?.value);
  };
  return (
    <>
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
        <h2 className="text-xl font-bold mb-4 text-black">Payment Options</h2>
        <Radio.Group className="w-full" onChange={HandelPaymentOption}>
          <Space direction="vertical" className="w-full">
            <Radio value="upi" disabled className="w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span>Pay by any UPI app</span>
                </div>
              </div>
            </Radio>
            <Divider />
            <Radio disabled value="card" className="w-full">
              Credit / Debit / ATM Card
              <span className="text-gray-500 block">
                Add and secure cards as per RBI guidelines
              </span>
            </Radio>
            <Divider />
            <Radio disabled value="netbanking" className="w-full">
              Net Banking
              <span className="text-gray-500 block">
                This instrument has low success, use UPI or cards for better
                experience
              </span>
            </Radio>
            <Divider />
            <Radio disabled value="emi" className="w-full">
              EMI (Easy Installments)
            </Radio>
            <Divider />
            <Radio value="cod" className="w-full">
              Cash on Delivery
            </Radio>
          </Space>
        </Radio.Group>
      </div>
      <div className="text-center my-5">
        <Button
          onClick={HandelConfirmOrder}
          disabled={isSubmitting}
          className=""
        >
          CONFIRM ORDER
        </Button>
      </div>
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
    </>
  );
};

export default PaymentOptions;
