// PhoneAuth.js
import React, { useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../../firebaseConfig"; // Adjust the path as necessary

const auth = getAuth(app);

const index = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved - will proceed with submit function
            handleSendCode();
          },
          "expired-callback": () => {
            // Reset reCAPTCHA
          },
        },
        auth
      );
    }
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
      })
      .catch((error) => {
        console.error("Error during signInWithPhoneNumber:", error);
      });
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    signInWithCredential(auth, credential)
      .then((result) => {
        // User signed in successfully.
        console.log("User signed in:", result);
      })
      .catch((error) => {
        console.error("Error during signInWithCredential:", error);
      });
  };
  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("User signed in with Google:", user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Error during Google sign-in:", errorMessage);
      });
  };

  const handleSignInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Facebook Access Token.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("User signed in with Facebook:", user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.error("Error during Facebook sign-in:", errorMessage);
      });
  };

  return (
    <div>
      <form onSubmit={handleSendCode} className="text-black">
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
        />
        <button type="submit">Send Code</button>
        <div id="recaptcha-container"></div>
      </form>
      <form onSubmit={handleVerifyCode} className="text-black">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="OTP"
        />
        <button type="submit">Verify Code</button>
      </form>
      <button className="text-black" onClick={handleSignInWithGoogle}>
        Sign in with Google
      </button>
      <button className="text-black" onClick={handleSignInWithFacebook}>
        Sign in with Facebook
      </button>
    </div>
  );
};

export default index;
