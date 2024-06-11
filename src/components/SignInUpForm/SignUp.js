import { useState } from "react";
import { useFormik } from "formik";
import { Input, Modal, message, Radio } from "antd";
import { SignUpSchema } from "@/Schemas/client/FormSchema";
import { useAuthData } from "@/service/Auth";
import { useRouter } from "next/router";
import { FiLock, FiPhone, FiUser } from "react-icons/fi";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  getAuth,
} from "firebase/auth";
import { app } from "../../../firebaseConfig";
import { TfiEmail } from "react-icons/tfi";
import AutoSignInUp from "./AutoSignIn-Up";

const auth = getAuth(app);

const SignUpForm = ({ onSignUp }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmpasswordVisible, setConfirmpasswordVisible] = useState(false);
  const [isotp, setIsotp] = useState(false);
  const [contactMethod, setContactMethod] = useState("phone");
  const { HandelSignUp, HandelverifyOTP,PostCreateUser } = useAuthData();
  const [otp, setOtp] = useState(null);
  const [verificationId, setVerificationId] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      emailOrPhone: "",
      password: "Check@123",
      confirmpassword: "Check@123",
    },
    validationSchema: SignUpSchema(contactMethod),
    onSubmit: async (values) => {
      try {
        if (contactMethod === "phone") {
          // console.log(contactMethod,values,"contactMethod");
          handleSendCode();
        } else {
          const res = await HandelSignUp(values);
          if (res?.status === 201) {
            message.success(res?.data?.message);
            setIsotp(true);
          }
        }
      } catch (error) {
        message.error(error);
      }
    },
  });

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            handleSendCode();
          },
          "expired-callback": () => {
            // Reset reCAPTCHA
          },
        },
        auth
      );
    }
  };
  const handleSendCode = () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = `+91${formik?.values?.emailOrPhone}`;
    console.log(phoneNumber, "phoneNumber");
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        setOtp(true);
      })
      .catch((error) => {
        setOtp(true);
        console.error("Error during signInWithPhoneNumber:", error);
      });
  };

  const handleVerifyCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const result = await signInWithCredential(auth, credential);
      console.log("User signed in:", result);
      message.success("Phone number verified successfully");
      try {
        const res = await PostCreateUser(formik?.values);
        console.log(res,"res");
        if (res?.status == 201) {
          message.success(res?.data?.message);
          window.localStorage.setItem(
            "Authorization",
            res?.data?.user?.SecretToken
          );
          window.localStorage.setItem("User", JSON.stringify(res?.data?.user));
          setIsotp(false);
          router.back();
        }
      } catch (error) {
        message.error(error?.response?.data?.message);
      }
    } catch (error) {
      message.error("Invalid OTP. Please try again.");
    }
  };

  const handleOk = async () => {
    if (contactMethod === "phone") {
      await handleVerifyCode();
    } else {
      try {
        const res = await HandelverifyOTP({
          otp,
          emailOrPhone: formik.values.emailOrPhone,
        });
        if (res?.status == 201) {
          message.success(res?.data?.message);
          window.localStorage.setItem(
            "Authorization",
            res?.data?.user?.SecretToken
          );
          window.localStorage.setItem("User", JSON.stringify(res?.data?.user));
          setIsotp(false);
          router.back();
        }
      } catch (error) {
        message.error(error?.response?.data?.message);
      }
    }
  };

  const handleCancel = () => {
    setIsotp(!isotp);
  };
  return (
    <>
      <form
        className="px-2 tsm:px-8 pt-6 text-black"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-2xl font-semibold text-[#3b82f6]">
          Register Your Account
        </h1>
        <h1 className="text-[14px] mb-4">
          Please register your account to continue.
        </h1>
        <div className="mb-4">
          <label htmlFor="name">Full Name</label>
          <Input
            prefix={<FiUser className="text-[20px]" />}
            type="text"
            name="name"
            placeholder="Enter Name"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="text-red-500">{formik.errors.name}</div>
          )}
        </div>
        <div className="mb-4">
          <Radio.Group
            onChange={(e) => {
              setContactMethod(e.target.value);
              formik.setFieldValue("emailOrPhone", "");
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
            name="emailOrPhone"
            placeholder={contactMethod === "email" ? "Email" : "Phone Number"}
            className="w-full px-4 py-2 border rounded-lg  focus:border-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.emailOrPhone}
          />
          {formik.errors.emailOrPhone && formik.touched.emailOrPhone && (
            <div className="text-red-500">{formik.errors.emailOrPhone}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <Input.Password
            prefix={<FiLock className="text-[20px]" />}
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full px-4 mt-1 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
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
          <label htmlFor="confirmpassword">Confirm Password</label>
          <Input.Password
            prefix={<FiLock className="text-[20px]" />}
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
        <div id="recaptcha-container"></div> {/* Added recaptcha container */}
      </form>
      {isotp && (
        <Modal
          maskClosable={false}
          title={`OTP sent to ${formik?.values?.emailOrPhone}`}
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
      <AutoSignInUp/>
    </>
  );
};

export default SignUpForm;
