import { Button, Input, Modal, message } from "antd";
import { useState } from "react";
import { useFormik } from "formik";
import { SignInSchema } from "@/Schemas/FormSchema";
import axios from "axios";
const SignInForm = ({ onSignIn }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModel, setShowModel] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      onSignIn(values);
    },
  });
  const handleSendOTP = async () => {
    try {
      const res = await axios.post("/api/auth/reset-password", { email });
      if (res.status === 200) {
        message.success(res?.data?.message);
        setStep(2);
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  };
  const handleVerifyOTP = async () => {
    try {
      const res = await axios.post("/api/auth/reset-password", { email, otp });
      if (res.status === 200) {
        message.success(res?.data?.message);
        setStep(3)
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  };
  const handleResetPassword = async () => {
    try {
      const res = await axios.post("/api/auth/reset-password", { email, password });
      if (res.status === 200) {
        message.success(res?.data?.message);
        setStep(1)
        setShowModel(false)
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <form className="px-0 tsm:px-8 py-6" onSubmit={formik.handleSubmit}>
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <Input.Password
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}
        </div>
        <div className="flex items-center justify-between mb-4">
          <a
            onClick={() => setShowModel(true)}
            className="text-blue-500 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Sign In
        </button>
      </form>
      <Modal
        title="Reset Password"
        visible={showModel}
        onCancel={() => setShowModel(false)}
        footer={null}
      >
        {step === 1 && (
          <div>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <Button className="mt-3" danger onClick={handleSendOTP}>
              Send OTP
            </Button>
          </div>
        )}
        {step === 2 && (
          <div>
            <Input
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />{" "}
            <Button className="mt-3" danger onClick={handleVerifyOTP}>
              Verify OTP
            </Button>
          </div>
        )}
        {step === 3 && (
          <div>
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <Input.Password
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />{" "}
            <Button className="mt-3" danger onClick={handleResetPassword}>
              Reset Password
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default SignInForm;
