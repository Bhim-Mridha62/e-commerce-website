import SignInForm from "@/components/SignInUpForm/SignIn";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>
        <title>Sign-in | </title>
      </Head>
      <div>
        <SignInForm />
      </div>
    </>
  );
}

export default index;
