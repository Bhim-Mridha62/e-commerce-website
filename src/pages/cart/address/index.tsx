import React, { useEffect } from "react";
import { useFormik } from "formik";
import { DeliveryAddressSchema } from "@/Schemas/client/FormSchema";
import { districts } from "@/utils/client/districts";
import PriceDetails from "@/components/common/PriceDetails";
import { Collapse } from "antd";
import { useRouter } from "next/router";
import { decodeData, encodeData } from "@/utils/client/encoding";
import { IAddress } from "@/types/types";
import { useUser } from "@/context/authContext";
import { useAuthData } from "@/service/Auth";

const index = () => {
  const router = useRouter();
  const { data } = router.query;
  const { getProfile } = useAuthData();
  const priceDetails = decodeData(data as string);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getProfileData();
    }
  }, [user]);

  const getProfileData = async () => {
    try {
      const res = await getProfile(1);
      console.log(res, "res");

      if (res?.status === 200 && res?.data?.address.name) {
        formik.setValues(res?.data?.address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik<IAddress>({
    initialValues: {
      name: "",
      phone: "",
      alternatePhone: "",
      pincode: "",
      state: "Odisha",
      district: "",
      village: "",
      buildingAddress: "",
    },
    validationSchema: DeliveryAddressSchema,
    onSubmit: (values) => {
      const addressData = {
        ...values,
      };
      const encodedAddressData = encodeData(addressData as string);
      router.push(
        `/cart/address/payment?data=${data}&address=${encodedAddressData}`
      );
    },
    enableReinitialize: true,
  });
  return (
    <div className="md:w-[70%] mx-auto mt-7 px-4">
      <Collapse
        expandIconPosition="end"
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
      <p className="text-xl text-black font-bold mb-1">Delivery Details</p>
      <p className="text-gray-600">
        Please provide your delivery information to ensure a smooth shopping
        experience.
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="text-gray-700 font-semibold">
              <span className="text-red-500">*</span> Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="text-gray-700 font-semibold">
              <span className="text-red-500">*</span> Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="alternatePhone"
              className="text-gray-700 font-semibold"
            >
              Alternate Phone Number
            </label>
            <input
              type="text"
              id="alternatePhone"
              name="alternatePhone"
              placeholder="Enter alternate phone number"
              className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.alternatePhone}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pincode" className="text-gray-700 font-semibold">
              <span className="text-red-500">*</span> Pin Code
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder="Enter your pin code"
              className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pincode}
            />
            {formik.touched.pincode && formik.errors.pincode ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.pincode}
              </div>
            ) : null}
          </div>
          <div>
            <label htmlFor="state" className="text-gray-700 font-semibold">
              <span className="text-red-500">*</span> State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="Select your state"
              className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
            />
            {formik.touched.state && formik.errors.state ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.state}
              </div>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="district" className="text-gray-700 font-semibold">
              <span className="text-red-500">*</span> District
            </label>
            <select
              id="district"
              name="district"
              className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.district}
            >
              <option value="" disabled>
                --- Select District ---
              </option>
              {districts?.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {formik.touched.district && formik.errors.district ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.district}
              </div>
            ) : null}
          </div>
          <div>
            <label htmlFor="village" className="text-gray-700 font-semibold">
              <span className="text-red-500">*</span> village
            </label>
            <input
              type="text"
              id="village"
              name="village"
              placeholder="Enter your village"
              className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.village}
            />
            {formik.touched.village && formik.errors.village ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.village}
              </div>
            ) : null}
          </div>
        </div>
        <div>
          <label
            htmlFor="buildingAddress"
            className="text-gray-700 font-semibold"
          >
            Building Address
          </label>
          <textarea
            id="buildingAddress"
            name="buildingAddress"
            placeholder="Enter your building address"
            rows={3}
            className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.buildingAddress}
          />
          {formik.touched.buildingAddress && formik.errors.buildingAddress ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.buildingAddress}
            </div>
          ) : null}
        </div>
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Delivery Tips
          </h3>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>Double-check your PIN code to ensure accurate delivery.</li>
            <li>
              Include a landmark near your location for easier navigation.
            </li>
            <li>
              If you're in an apartment, mention the floor and flat number.
            </li>
            <li>Provide an alternate phone number for backup contact.</li>
          </ul>
        </div>
        <div className="flex items-center md:flex-row flex-col md:gap-0 gap-4 justify-between">
          <p className="text-sm text-gray-500 mr-auto">
            Fields marked with <span className="text-red-500">*</span> are
            required
          </p>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default index;
