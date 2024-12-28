import Link from "next/link";
import React, { memo, useState } from "react";
import { useFormik } from "formik";
import { ContactUsSchema } from "@/Schemas/client/FormSchema";
import { notification } from "antd";
import { useAuthData } from "@/service/Auth";
import { IContactUs } from "@/types/types";
import { CgSpinnerTwo } from "react-icons/cg";
const Contact = memo(() => {
  const { postContactUs } = useAuthData();
  const [loading, setLoading] = useState<boolean>(false);
  const formik = useFormik<IContactUs>({
    initialValues: {
      phone: "",
      message: "",
      email: "",
      name: "",
      address: "",
    },
    validationSchema: ContactUsSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const res = await postContactUs(values);
        if (res?.status === 200) {
          notification.success({ message: res?.data?.message });
          resetForm();
        } else {
          notification.error({
            message: "Something went wrong. Please try again later.",
          });
        }
        setLoading(false);
      } catch (error) {
        notification.error({
          message: "Something went wrong. Please try again later.",
        });
        setLoading(false);
      }
    },
  });

  return (
    <section id="contact" className="relative bg-[#111827]">
      <div className="w-full px-5 py-10 mx-auto flex flex-wrap">
        <div className="md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            title="map"
            className="absolute inset-0"
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5766.092794292917!2d81.60224037087305!3d18.081339492905265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a30c4e0b0b1a769%3A0x8faa33ec81eeb6a6!2sKalimela%2C%20Odisha%20764047!5e0!3m2!1sen!2sin!4v1702925751903!5m2!1sen!2sin"
          />
          <div className="bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                ADDRESS
              </h2>
              <Link
                href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5766.092794292917!2d81.60224037087305!3d18.081339492905265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a30c4e0b0b1a769%3A0x8faa33ec81eeb6a6!2sKalimela%2C%20Odisha%20764047!5e0!3m2!1sen!2sin!4v1702925751903!5m2!1sen!2sin"
                target="blank"
              >
                <p className="mt-1">
                  Near Kalimela <br />
                  Malkangiri,Odisha, 764047
                </p>
              </Link>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                EMAIL
              </h2>
              <a href={`mailto:bhimmridha62@gmail.com`} target="blank">
                bhimmridha62@gmail.com
              </a>
              <h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">
                PHONE
              </h2>
              <Link href="tel:7655883526" target="blank">
                Call Us:+91-7655883526
              </Link>
            </div>
          </div>
        </div>
        <form
          name="contact"
          onSubmit={formik.handleSubmit}
          className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0"
        >
          <h2 className="text-white md:text-4xl text-2xl mb-1 font-medium title-font">
            Get In Touch With Us
          </h2>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="relative mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-400">
              Contact Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              maxLength={10}
              onChange={(e) => {
                const { value } = e.target;
                // Allow only numbers
                const sanitizedValue = value.replace(/[^0-9]/g, "");
                formik.setFieldValue("phone", sanitizedValue);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="address"
              className="leading-7 text-sm text-gray-400"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-sm">
                {formik.errors.address}
              </div>
            ) : null}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-400"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            />
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500 text-sm">
                {formik.errors.message}
              </div>
            ) : null}
          </div>
          <button
            disabled={loading}
            type="submit"
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2  ">
                <CgSpinnerTwo className="animate-spin" />
                Please wait...
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </section>
  );
});
export default Contact;
