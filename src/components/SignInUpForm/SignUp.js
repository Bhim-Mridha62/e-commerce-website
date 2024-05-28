import { useState } from "react";
import { Formik, useFormik } from "formik";
import { Input, Modal, message } from "antd";
import { SignUpSchema } from "@/Schemas/client/FormSchema";
import { useAuthData } from "@/service/Auth";
const SignUpForm = ({ onSignUp }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmpasswordVisible, setConfirmpasswordVisible] = useState(false);
  const [isotp, setIsotp] = useState(false);
  const { HandelSignUp, HandelverifyOTP } = useAuthData();
  const [otp, setOtp] = useState(null);
  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      email: "",
      password: "Check@123",
      confirmpassword: "Check@123",
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      try {
        const res = await HandelSignUp(values);
        if (res?.status === 201) {
          message.success(res?.data?.message);
          setIsotp(true);
        }
      } catch (error) {
        message.error(error?.response?.data?.message);
      }
    },
  });
  const handleOk = async () => {
    try {
      const res = await HandelverifyOTP({ otp, email: formik.values.email });
      console.log(res, "res");
      if (res?.status == 201) {
        message.success(res?.data?.message);
        window.localStorage.setItem(
          "Authorization",
          res?.data?.user?.SecretToken
        );
        window.localStorage.setItem("User", JSON.stringify(res?.data?.user));
        setIsotp(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setIsotp(!isotp);
  };
  return (
    <>
      <form
        className="px-0 tsm:px-8 py-6 text-black"
        onSubmit={formik.handleSubmit}
      >
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
              onVisibleChange: setPasswordVisible,
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
              onVisibleChange: setConfirmpasswordVisible,
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
      {isotp && (
        <Modal
          title={`OTP sent to ${formik?.values?.email}`}
          open={isotp}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={<span className=" text-black">Send</span>}
        >
          <div className="flex flex-wrap justify-center">
            <input
              onChange={(e) => setOtp(e.target.value)}
              type="number"
              placeholder="Enter OTP"
              maxLength="6"
              className="w-full h-12 text-center border rounded mr-1"
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default SignUpForm;
