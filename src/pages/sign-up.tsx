import Head from "next/head";
import React from "react";
import SignUpForm from "@/components/SignInUpForm/SignUp";
function index() {
  return (
    <>
      <Head>
        <title>Sign-up | </title>
      </Head>
      <div>
        <SignUpForm />
      </div>
    </>
  );
}

export default index;
