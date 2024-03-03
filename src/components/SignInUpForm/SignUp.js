import { useState } from 'react';
import {Formik, useFormik } from 'formik';
import { Input } from 'antd';
import { SignUpSchema } from '@/Schemas/FormSchema';
const SignUpForm = ({ onSignUp }) => {
  const [passwordVisible, setPasswordVisible] =useState(false);
  const [confirmpasswordVisible, setConfirmpasswordVisible] =useState(false);
 const formik=useFormik({
  initialValues: {
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    confirmpassword: "",
  },
  validationSchema:SignUpSchema,
  onSubmit:(values)=>{
    console.log(values,"values")
  }
 })
  return (
    <form className="px-0 tsm:px-8 py-6" onSubmit={formik.handleSubmit}>
      <h1 className="text-2xl font-semibold mb-4">Create Account</h1>
      <div className="mb-4">
        <input
          type="text"
          name="FirstName"
          placeholder="Enter First Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.FirstName}
        />
        {formik.errors.FirstName && formik.touched.FirstName && (
          <div className="text-red-500">{formik.errors.FirstName}</div>
        )}
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="LastName"
          placeholder="Enter Last Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.LastName}
        />
        {formik.errors.LastName && formik.touched.LastName && (
          <div className="text-red-500">{formik.errors.LastName}</div>
        )}
      </div>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && (
          <div className="text-red-500">{formik.errors.email}</div>
        )}
      </div>
      <div className="mb-4">
        <Input.Password
          type="password"
          name="password"
          placeholder="Enter Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          visibilityToggle={{
            visible: passwordVisible,
            setVisibility: setPasswordVisible,
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && (
          <div className="text-red-500">{formik.errors.password}</div>
        )}
      </div>
      <div className="mb-4">
        <Input.Password
          type="password"
          name="confirmpassword"
          placeholder="Enter Confirm Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          visibilityToggle={{
            visible: confirmpasswordVisible,
            setVisibility: setConfirmpasswordVisible,
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmpassword}
        />
        {formik.errors.confirmpassword && formik.touched.confirmpassword && (
          <div className="text-red-500">{formik.errors.confirmpassword}</div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
