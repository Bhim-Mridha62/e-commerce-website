import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { DeliveryAddressSchema } from "@/Schemas/client/FormSchema";
import { districts } from "@/utils/client/districts.js";
import PriceDetails from "@/components/common/PriceDetails";
import { Collapse } from "antd";
import { useRouter } from "next/router";
import { decodeData, encodeData } from "@/utils/client/encoding";
const index = () => {
  const router = useRouter();
  const { data } = router.query;
  const priceDetails = decodeData(data);
  const initialValues = {
    name: "",
    phone: "",
    alternatePhone: "",
    pincode: "",
    state: "Odisha",
    district: "",
    Villege: "",
    buildingAddress: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    const addressData = {
      ...values,
    };
    const encodedAddressData = encodeData(addressData);
    router.push(
      `/cart/address/payment?data=${data}&address=${encodedAddressData}`
    );
    resetForm();
  };
  return (
    <div className="m-4">
      <Collapse
        ghost
        items={[
          {
            key: "1",
            label: "Price Details",
            children: priceDetails && (
              <PriceDetails productData={priceDetails} />
            ),
          },
        ]}
      />
      <p className="text-xl text-black font-bold mb-1">
        Enter Delivery Address
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={DeliveryAddressSchema}
        onSubmit={handleSubmit}
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="text-gray-700 font-semibold">
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pincode" className="text-gray-700 font-semibold">
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
              <label htmlFor="state" className="text-gray-700 font-semibold">
                <span className="text-red-500">*</span> State
              </label>
              <Field
                type="text"
                id="state"
                value="Odisha"
                name="state"
                placeholder="Select your state"
                className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 "
              />
              <ErrorMessage
                name="state"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="district" className="text-gray-700 font-semibold">
                <span className="text-red-500">*</span> District
              </label>
              <Field
                as="select"
                id="district"
                name="district"
                placeholder="Select your district"
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
              <label htmlFor="Villege" className="text-gray-700 font-semibold">
                <span className="text-red-500">*</span> Villege
              </label>
              <Field
                type="text"
                id="Villege"
                name="Villege"
                placeholder="Enter your Villege"
                className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 "
              />
              <ErrorMessage
                name="Villege"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
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
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default index;
