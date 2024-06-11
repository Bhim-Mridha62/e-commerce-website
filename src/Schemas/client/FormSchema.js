import {
  emailRegex,
  nameRegex,
  passwordRegex,
  phoneRegex,
} from "@/utils/client/regEx";
import * as Yup from "yup";
export const SignUpSchema = (contactMethod) => {
  return Yup.object().shape({
    name: Yup.string()
      .matches(/[a-zA-Z]+$/, "Enter a valid name")
      .required("Name is required!"),
    emailOrPhone: Yup.string()
      .required(
        contactMethod === "phone"
          ? "Phone number is required!"
          : "Email is required!"
      )
      .matches(
        contactMethod === "phone" ? phoneRegex : emailRegex,
        contactMethod === "phone"
          ? "Enter a valid phone number"
          : "Enter a valid email"
      ),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .matches(/\d/, "Password must contain at least one number")
      .required("Password is required!"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required!"),
  });
};

export const SignInSchema = (contactMethod) => {
  return Yup.object().shape({
    email: Yup.string()
      .matches(
        contactMethod === "phone" ? phoneRegex : emailRegex,
        contactMethod === "phone"
          ? "Enter a valid phone number"
          : "Enter a valid email"
      )
      .required(
        contactMethod === "phone"
          ? "Phone number is required!"
          : "Email is required!"
      ),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .matches(/\d/, "Password must contain at least one number")
      .required("Password is required!"),
  });
};
export const DeliveryAddressSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[^\d]*$/, "Name must not contain numeric characters")
    .required("Please enter your name"),
  alternateName: Yup.string().matches(
    /^[^\d]*$/,
    "Name must not contain numeric characters"
  ),
  phone: Yup.number()
    .min(1000000000, "Mobile number must be at least 10 digits")
    .max(9999999999, "Mobile number cannot exceed 10 digits")
    .required("Please enter your phone number"),
  alternatePhone: Yup.number()
    .min(1000000000, "Mobile number must be at least 10 digits")
    .max(9999999999, "Mobile number cannot exceed 10 digits"),
  pincode: Yup.string().required("Please enter your pin code"),
  state: Yup.string().required("Please select your state"),
  district: Yup.string().required("Please select your district"),
  Villege: Yup.string().required("Please enter your Villege"),
  buildingAddress: Yup.string().required("Please enter your building address"),
});
export const GiveRatingSchema = Yup.object().shape({
  rating: Yup.number()
    .required("Rating is required")
    .min(1, "Rating must be at least 1"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"),
});
