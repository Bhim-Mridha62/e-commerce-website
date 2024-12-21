import React from "react";
import SignUpForm from "@/components/SignInUpForm/SignUp";
import SEO from "@/components/common/seo";
function index() {
  return (
    <>
      <SEO
        title="Sign Up"
        description="Create an account on SD FASHION SHOP and start shopping now."
        url="sign-up"
      />
      <div>
        <SignUpForm />
      </div>
    </>
  );
}

export default index;
