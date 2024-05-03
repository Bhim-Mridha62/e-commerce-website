import { useState } from 'react';
import SignInForm from '@/components/SignInUpForm/SignIn';
import SignUpForm from '@/components/SignInUpForm/SignUp';

const SignInUpForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = (formData) => {
  };

  const handleSignUp = (formData) => {
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="container p-4 bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex gap-3 justify-center mb-4">
          <button
            onClick={() => setIsSignUp(false)}
            className={`px-4 py-2 text-sm rounded-lg focus:outline-none ${
              !isSignUp ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`px-4 py-2 text-sm rounded-lg focus:outline-none ${
              isSignUp ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            Sign Up
          </button>
        </div>
        {isSignUp ? (
          <SignUpForm onSignUp={handleSignUp} />
        ) : (
          <SignInForm onSignIn={handleSignIn} />
        )}
      </div>
    </div>
  );
};

export default SignInUpForm;
