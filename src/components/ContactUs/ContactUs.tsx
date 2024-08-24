"use client";
import React, { useState } from "react";
function Contactus() {
  const [values, setValues] = useState({
    user_name: "",
    user_email: "",
    user_website: "",
    user_number: "",
    user_message: "",
  });
  const handleSubmit = () => {};
  const handleChange = () => {};
  return (
      <div className="p-6 bg-white rounded-lg shadow-md text-black">
        <h2 className="text-2xl font-bold mb-4">Contact Form</h2>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="block mb-2">
            Full Name:
          </label>
          <input
            type="text"
            id="name"
            name="user_name"
            onChange={handleChange}
            value={values.user_name}
            className="w-full border rounded-md px-4 py-2 mb-2"
          />
          {/* {errors.user_name && touched.user_name && <span className='text-red-500'>{errors.user_name}</span>} */}

          <label htmlFor="email" className="block mb-2">
            Email Id:
          </label>
          <input
            type="email"
            id="email"
            name="user_email"
            onChange={handleChange}
            value={values.user_email}
            className="w-full border rounded-md px-4 py-2 mb-2"
          />
          {/* {errors.user_email && touched.user_email && <span className='text-red-500'>{errors.user_email}</span>} */}

          <label htmlFor="website" className="block mb-2">
            Website :
          </label>
          <input
            type="text"
            id="website"
            name="user_website"
            onChange={handleChange}
            value={values.user_website}
            className="w-full border rounded-md px-4 py-2 mb-2"
          />
          {/* {errors.user_website && touched.user_website && <span className='text-red-500'>{errors.user_website}</span>} */}

          <label htmlFor="contact" className="block mb-2">
            Contact Number :
          </label>
          <input
            type="text"
            id="contact"
            name="user_number"
            onChange={handleChange}
            value={values.user_number}
            className="w-full border rounded-md px-4 py-2 mb-2"
          />
          {/* {errors.user_number && touched.user_number && <span className='text-red-500'>{errors.user_number}</span>} */}

          <label htmlFor="message" className="block mb-2">
            Message :
          </label>
          <textarea
            name="user_message"
            id="message"
            onChange={handleChange}
            value={values.user_message}
            className="w-full border rounded-md px-4 py-2 mb-2"
          ></textarea>
          {/* {errors.user_message && touched.user_message && <span className='text-red-500'>{errors.user_message}</span>} */}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
    </div>
  );
}

export default Contactus;
