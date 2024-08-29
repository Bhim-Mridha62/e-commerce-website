import { Button, Input, Modal, Radio, message } from "antd";
import { useState } from "react";
import { useFormik } from "formik";
import { SignInSchema } from "@/Schemas/client/FormSchema";
import { useAuthData } from "@/service/Auth";
import { useRouter } from "next/router";
import AutoSignInUp from "./AutoSignIn-Up";
import { TfiEmail } from "react-icons/tfi";
import { FiLock, FiPhone } from "react-icons/fi";
import { useUser } from "@/context/authContext";
import { SignInFormValues } from "@/types/types";
const SignInForm = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [contactMethod, setContactMethod] = useState<string>("phone");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showModel, setShowModel] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { LoginUser, PostResetPassword } = useAuthData();
  const { UpdateUser } = useUser();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "Check@123",
    },
    validationSchema: SignInSchema(contactMethod),
    onSubmit: (values) => {
      HandelLogin(values);
    },
  });
  const HandelLogin = async (values: SignInFormValues) => {
    try {
      setLoading(true);
      const res = await LoginUser({
        emailOrPhone: values.email,
        password: values.password,
      });
      setLoading(false);
      if (res?.status === 201) {
        message.success(res?.data?.message);
        window.localStorage.setItem(
          "Authorization",
          res?.data?.user?.SecretToken
        );
        window.localStorage.setItem("User", JSON.stringify(res?.data?.user));
        UpdateUser();
        router.push("/");
      }
    } catch (error: any) {
      setLoading(false);
      message.error(error?.response?.data?.message);
    }
  };
  const handleSendOTP = async () => {
    try {
      const res = await PostResetPassword({ emailOrPhone: email });
      if (res?.status === 200) {
        message.success(res?.data?.message);
        setStep(2);
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message);
    }
  };
  const handleVerifyOTP = async () => {
    try {
      const res = await PostResetPassword({ emailOrPhone: email, otp: otp });
      if (res?.status === 200) {
        message.success(res?.data?.message);
        setStep(3);
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message);
    }
  };
  const handleResetPassword = async () => {
    if (password != confirmPassword) {
      message.info("Password no match");
      return;
    }
    try {
      const res = await PostResetPassword({
        emailOrPhone: email,
        password: password,
      });
      if (res?.status === 200) {
        message.success(res?.data?.message);
        setShowModel(false);
        setStep(1);
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message);
    }
    // HandelLogin({ emailOrPhone: email, password: password });
  };
  const handleButtonClick = () => {
    formik.handleSubmit();
  };
  return (
    <>
      <form
        className="px-2 tsm:px-8 pt-6 text-black"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-2xl font-semibold text-[#3b82f6]">Hi, Welcome</h1>
        <h1 className="text-[14px] mb-4">
          Please sign in to your account to continue.
        </h1>
        <div className="mb-4">
          <Radio.Group
            onChange={(e) => {
              setContactMethod(e.target.value);
              formik.setFieldValue("email", "");
            }}
            value={contactMethod}
          >
            <Radio value="phone">Phone</Radio>
            <Radio value="email">Email</Radio>
          </Radio.Group>
        </div>
        <div className="mb-4">
          <Input
            prefix={
              contactMethod === "email" ? (
                <TfiEmail className="text-[20px]" />
              ) : (
                <FiPhone className="text-[20px]" />
              )
            }
            type={contactMethod === "email" ? "email" : "tel"}
            name="email"
            placeholder={contactMethod === "email" ? "Email" : "Phone Number"}
            className="w-full px-4 py-2 border rounded-lg focus:border-blue-500"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <Input.Password
            prefix={<FiLock className="text-[20px]" />}
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            onChange={formik.handleChange}
            value={formik.values.password}
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
        <Button onClick={handleButtonClick} className="" loading={loading}>
          {loading ? "Please wait" : "Sign In"}
        </Button>
      </form>
      <Modal
        maskClosable={false}
        title="Reset Password"
        open={showModel}
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
              className="mb-4"
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
      <AutoSignInUp />
    </>
  );
};

export default SignInForm;
