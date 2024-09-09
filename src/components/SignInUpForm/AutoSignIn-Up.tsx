import { Facebook, Google } from "@/utils/client/svg-icon";
import { Button, Divider, message } from "antd";
import {
  FacebookAuthProvider,
  // GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { app } from "../../../firebaseConfig";
import { useAuthData } from "@/service/Auth";
import { useUser } from "@/context/authContext";
const auth = getAuth(app);

const AutoSignInUp = () => {
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
    // try {
    //   const res = axios.get("/api/auth/google-login");
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }

    router.push("/api/auth/google-login");
    // const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // This gives you a Google Access Token.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     console.log("User signed in with Google:", user);
    //     CreateUser({
    //       name: user?.displayName,
    //       emailOrPhone: user?.email,
    //       password: "",
    //     });
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     console.error("Error during Google sign-in:", errorMessage);
    //   });
  };
  const handleSignInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Facebook Access Token.
        // const credential = FacebookAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("User signed in with Facebook:", user);
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        // const credential = FacebookAuthProvider.credentialFromError(error);
        console.error("Error during Facebook sign-in:", errorMessage);
      });
  };
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
};

export default AutoSignInUp;
