import { useRouter } from "next/router";
import React from "react";
import { FiLogIn, FiShoppingBag } from "react-icons/fi";

const EmptyOrder = ({ IsLogin }: { IsLogin: boolean }) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/sign-in"); // Redirect to the login page
  };
  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      {IsLogin ? (
        <FiShoppingBag className="text-6xl text-gray-600 mb-4" />
      ) : (
        <FiLogIn className="text-6xl text-gray-600 mb-4" />
      )}
      <h2 className="text-2xl font-semibold mb-2">
        {IsLogin ? "No Orders Yet" : "Please Log In"}
      </h2>
      <p className="text-gray-500 mb-6">
        {IsLogin
          ? "You haven't placed any orders yet. Start shopping now!"
          : "You need to log in to view your orders."}
      </p>
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        {IsLogin ? "Start Shopping" : "Log In"}
      </button>
    </div>
  );
};

export default EmptyOrder;
