import React from "react";
import { districts } from "@/utils/client/districts";
import { IAddress } from "@/types/types";
import { FormikProps } from "formik";
import { Checkbox } from "antd";
interface AddressFormProps {
  formik: FormikProps<IAddress>;
  isSave?: boolean;
}
const AddressFrom = ({ formik, isSave = false }: AddressFormProps) => {
  return (
    <>
      <p className="text-xl text-black font-bold mb-4">Delivery Details</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-item">
          <input
            type="text"
            id="name"
            name="name"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik?.values?.name}
          />
          <label htmlFor="name">Full Name</label>
          {formik?.touched?.name && formik?.errors?.name ? (
            <div className="text-red-500 text-sm mt-1">
              {formik?.errors?.name}
            </div>
          ) : null}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <div className="form-item">
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder=" "
              className=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik?.values?.phone}
            />
            <label htmlFor="phone">Phone Number</label>
            {formik?.touched?.phone && formik?.errors?.phone ? (
              <div className="text-red-500 text-sm mt-1">
                {formik?.errors?.phone}
              </div>
            ) : null}
          </div>
          <div className="form-item">
            <input
              type="text"
              id="alternatePhone"
              name="alternatePhone"
              placeholder=" "
              className=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik?.values?.alternatePhone}
            />
            <label htmlFor="alternatePhone">Alternate Phone Number</label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <div className="form-item">
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder=" "
              className=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik?.values?.pincode}
            />
            <label htmlFor="pincode">Pin Code</label>
            {formik?.touched?.pincode && formik?.errors?.pincode ? (
              <div className="text-red-500 text-sm mt-1">
                {formik?.errors?.pincode}
              </div>
            ) : null}
          </div>
          <div className="form-item">
            <input
              type="text"
              id="state"
              name="state"
              placeholder=" "
              className=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik?.values?.state}
            />
            <label htmlFor="state">State</label>
            {formik?.touched?.state && formik?.errors?.state ? (
              <div className="text-red-500 text-sm mt-1">
                {formik?.errors?.state}
              </div>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <div className="form-item">
            <select
              id="district"
              name="district"
              className=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik?.values.district}
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
            <label htmlFor="district">District</label>
            {formik?.touched.district && formik?.errors.district ? (
              <div className="text-red-500 text-sm mt-1">
                {formik?.errors.district}
              </div>
            ) : null}
          </div>
          <div className="form-item">
            <input
              type="text"
              id="village"
              name="village"
              placeholder=""
              className=""
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik?.values.village}
            />
            <label htmlFor="village">village</label>
            {formik?.touched.village && formik?.errors.village ? (
              <div className="text-red-500 text-sm mt-1">
                {formik?.errors.village}
              </div>
            ) : null}
          </div>
        </div>
        <div className="form-item">
          <textarea
            id="buildingAddress"
            name="buildingAddress"
            placeholder=" "
            rows={3}
            className=""
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik?.values?.buildingAddress}
          />
          <label htmlFor="buildingAddress">Building Address</label>
          {formik?.touched?.buildingAddress &&
          formik?.errors?.buildingAddress ? (
            <div className="text-red-500 text-sm mt-1">
              {formik?.errors?.buildingAddress}
            </div>
          ) : null}
        </div>
        {isSave && (
          <div>
            {" "}
            <Checkbox>Save this information for next time</Checkbox>
          </div>
        )}
        {/* <div className="bg-blue-50 p-4 rounded-lg mb-4">
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
        </div> */}
        {/* <div className="flex items-center md:flex-row flex-col md:gap-0 gap-4 justify-between">
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
        </div> */}
      </form>
    </>
  );
};

export default AddressFrom;
