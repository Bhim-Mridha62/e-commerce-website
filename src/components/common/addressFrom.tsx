"use client";
import { Modal } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { districts } from "@/utils/client/districts";
import { DeliveryAddressSchema } from "@/Schemas/client/FormSchema";
import { IAddress } from "@/types/types";

const AddressForm = ({
  isFormOpen,
  handleFormClose,
  address,
  updateProfile,
}: {
  isFormOpen: boolean;
  handleFormClose: () => void;
  address: IAddress;
  updateProfile: (values: IAddress, isUser: boolean, user: any) => void;
}) => {
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
      updateProfile(values, false, {});
    },
  });
  useEffect(() => {
    if (address?.name) {
      formik.setValues(address);
    }
  }, [address]);

  console.log(address, "addressaddressaddress");

  return (
    <Modal
      maskClosable={false}
      title="Update Delivery Address"
      open={isFormOpen}
      onCancel={handleFormClose}
      footer={null}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="text-gray-700 font-semibold">
              <span className="text-red-500">*</span> Name
            </label>
            <input
              type="text"
              id="name"
              //   name="name"
              placeholder="Enter your name"
              className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="text-gray-700 font-semibold">
              <span className="text-red-500">*</span> Phone Number
            </label>
            <input
              type="text"
              id="phone"
              //   name="phone"
              placeholder="Enter your phone number"
              className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
              {...formik.getFieldProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          {/* Alternate Phone Field */}
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
              //   name="alternatePhone"
              placeholder="Enter alternate phone number"
              className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
              {...formik.getFieldProps("alternatePhone")}
            />
          </div>

          {/* Pincode Field */}
          <div>
            <label htmlFor="pincode" className="text-gray-700 font-semibold">
              <span className="text-red-500">*</span> Pin Code
            </label>
            <input
              type="text"
              id="pincode"
              //   name="pincode"
              placeholder="Enter your pin code"
              className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
              {...formik.getFieldProps("pincode")}
            />
            {formik.touched.pincode && formik.errors.pincode ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.pincode}
              </div>
            ) : null}
          </div>

          {/* State Field */}
          <div>
            <label htmlFor="state" className="text-gray-700 font-semibold">
              <span className="text-red-500">*</span> State
            </label>
            <input
              type="text"
              id="state"
              //   name="state"
              placeholder="Enter your state"
              className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
              {...formik.getFieldProps("state")}
            />
          </div>

          {/* District Field */}
          <div>
            <label htmlFor="district" className="text-gray-700 font-semibold">
              <span className="text-red-500">*</span> District
            </label>
            <select
              id="district"
              //   name="district"
              className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
              {...formik.getFieldProps("district")}
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

          {/* Village Field */}
          <div>
            <label htmlFor="village" className="text-gray-700 font-semibold">
              <span className="text-red-500">*</span> Village
            </label>
            <input
              type="text"
              id="village"
              //   name="village"
              placeholder="Enter your village"
              className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
              {...formik.getFieldProps("village")}
            />
            {formik.touched.village && formik.errors.village ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.village}
              </div>
            ) : null}
          </div>

          {/* Building Address Field */}
          <div>
            <label
              htmlFor="buildingAddress"
              className="text-gray-700 font-semibold"
            >
              Building Address
            </label>
            <textarea
              id="buildingAddress"
              //   name="buildingAddress"
              placeholder="Enter your building address"
              rows={3}
              className="border border-gray-300 text-black rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2"
              {...formik.getFieldProps("buildingAddress")}
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
      </form>
    </Modal>
  );
};

export default AddressForm;
