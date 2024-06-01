import { useRouter } from "next/router";
import React from "react";
import { BsBagHeartFill } from "react-icons/bs";

const EmptyWishlist = ({ IsLogin }) => {
  const router = useRouter();
  const handleButtonClick = () => {
    if (IsLogin) {
      router.push("/");
    } else {
      router.push("/login");
    }
  };
  return (
    <div className="text-center text-black my-4">
      <BsBagHeartFill
        className="inline-block text-[10rem] cursor-pointer"
        onClick={handleButtonClick}
      />
      <h1 className="text-3xl font-bold mb-4">
        {IsLogin
          ? "Your Wishlist is currently Empty🙁"
          : "Please login to see your Wishlist items"}
      </h1>
      <p className="text-lg mb-4">
        Before proceeding to checkout, you must add some products to your Wishlist.
      </p>
      <p className="text-lg mb-8">
        You will find a lot of interesting products on our "Shop" page.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        onClick={handleButtonClick}
      >
        {IsLogin ? "🛒 RETURN TO SHOP" : "Login"}
      </button>
    </div>
  );
};

export default EmptyWishlist;
