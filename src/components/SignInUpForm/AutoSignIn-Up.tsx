import { Facebook, Google } from "@/utils/client/svg-icon";
import { Button, Divider, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
import { useAuthData } from "@/service/Auth";
import { useUser } from "@/context/authContext";
const AutoSignInUp = memo(() => {
  const [isSignIn, setIsSignIn] = useState();
  const { PostCreateUser } = useAuthData();
  const { UpdateUser } = useUser();
  const router = useRouter();
  useEffect(() => {
    const { code } = router.query;
    if (code) {
      CreateUser(code);
    }
    if (router) {
      //@ts-ignore
      setIsSignIn(router.pathname === "/sign-in");
    }
  }, [router]);
  const handleSignInWithGoogle = async () => {
    router.push("/api/auth/google-login");
  };
  const handleSignInWithFacebook = () => {};
  const CreateUser = async (token: any) => {
    try {
      const res = await PostCreateUser({ token: token });
      if (res?.status == 200 || res?.status == 201) {
        message.success(`Sign ${isSignIn ? "Up" : "In"} sucessfully`);
        window.localStorage.setItem(
          "Authorization",
          res?.data?.data?.SecretToken
        );
        window.localStorage.setItem("User", JSON.stringify(res?.data?.data));
        UpdateUser();
        router.push("/");
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <Divider plain>Or Sign {isSignIn ? "In" : "Up"} With</Divider>
      <div className="flex justify-center gap-2 mb-2">
        <Button
          onClick={handleSignInWithGoogle}
          icon={<Google className="w-[15px] h-auto" />}
        >
          Google
        </Button>
        <Button
          onClick={handleSignInWithFacebook}
          icon={<Facebook className="w-[15px] h-auto" />}
        >
          Facebook
        </Button>
      </div>
      <div className="text-black text-center mb-8">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="text-[#2c8dd3] ml-1"
        >
          Sign {isSignIn ? "Up" : "In"}
        </Link>
      </div>
    </>
  );
});

export default AutoSignInUp;
