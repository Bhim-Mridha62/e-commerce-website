import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { DeliveryAddressSchema } from "@/Schemas/client/FormSchema";
const index = () => {
  const initialValues = {
    name: '',
    alternateName: '',
    phone: '',
    alternatePhone: '',
    pincode: '',
    state: '',
    district: '',
    Villege: '',
    buildingAddress: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    alert(JSON.stringify(values, null, 2));
    resetForm(); // Reset the form after submission
  };
  return (
    <div className="m-4">
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
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="alternateName"
              className="text-gray-700 font-semibold"
            >
              Alternate Name
            </label>
            <Field
              type="text"
              id="alternateName"
              name="alternateName"
              placeholder="Enter alternate name"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              as="select"
              id="state"
              name="state"
              placeholder="Select your state"
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your state</option>
              <option value="state1">State 1</option>
              <option value="state2">State 2</option>
            </Field>
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
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your district</option>
              <option value="district1">District 1</option>
              <option value="district2">District 2</option>
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
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            // disabled={isSubmitting}
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
