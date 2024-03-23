import { emailRegex, nameRegex, passwordRegex } from '@/utils/client/regEx';
import * as Yup from 'yup';
export const SignUpSchema =Yup.object().shape({
    FirstName:Yup.string().matches(nameRegex,'Enter a valid First Name').required( "First Name is required!"),
    LastName:Yup.string().matches(nameRegex,'Enter a valid Last Name').required( "Last Name is required!"),
    email:Yup.string().matches(emailRegex,'Enter a valid email').required( "Email is required!"),
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .matches(/\d/, 'Password must contain at least one number')
    .required("Password is required!"),
    confirmpassword:Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Confirm Password is required!"),
})
 
export const SignInSchema=Yup.object().shape({
      email:Yup.string().matches(emailRegex,"Please enter a valid Email").required("Email is Required"),
      password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .matches(/\d/, 'Password must contain at least one number')
    .required("Password is required!"),
})