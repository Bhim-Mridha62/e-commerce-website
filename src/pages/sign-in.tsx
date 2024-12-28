import SEO from "@/components/common/seo";
import SignInForm from "@/components/SignInUpForm/SignIn";
import React from "react";

function index() {
  return (
    <>
      <SEO
        title="Sign In"
        description="Sign in to your SD FASHION SHOP account to access exclusive features."
        url="sign-in"
      />
      <div>
        <SignInForm />
      </div>
    </>
  );
}

export default index;
