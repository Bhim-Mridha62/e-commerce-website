import { emailRegex, nameRegex, passwordRegex } from "@/utils/client/regEx";
import * as Yup from "yup";
export const SignUpSchema = Yup.object().shape({
  FirstName: Yup.string()
    .matches(nameRegex, "Enter a valid First Name")
    .required("First Name is required!"),
  LastName: Yup.string()
    .matches(nameRegex, "Enter a valid Last Name")
    .required("Last Name is required!"),
  email: Yup.string()
    .matches(emailRegex, "Enter a valid email")
    .required("Email is required!"),
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

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, "Please enter a valid Email")
    .required("Email is Required"),
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
