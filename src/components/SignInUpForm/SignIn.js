import { Input } from 'antd';
import { useState } from 'react';
import { useFormik } from 'formik';
import { SignInSchema } from '@/Schemas/FormSchema';
const SignInForm = ({ onSignIn }) => {
  const [passwordVisible, setPasswordVisible] =useState(false);
   const formik=useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema:SignInSchema,
    onSubmit:(values)=>{
       onSignIn(values);
    }
   })
  return (
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
           visible:passwordVisible,
           setVisibility: setPasswordVisible,
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
        <a href="#" className="text-blue-500 hover:underline">
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
  );
};

export default SignInForm;
