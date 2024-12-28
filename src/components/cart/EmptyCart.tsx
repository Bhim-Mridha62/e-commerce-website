import { useRouter } from "next/router";
import React, { memo } from "react";
import { FaCartPlus } from "react-icons/fa";

interface EmptyCartProps {
  IsLogin: boolean;
}

const EmptyCart: React.FC<EmptyCartProps> = memo(({ IsLogin }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (IsLogin) {
      router.push("/");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="text-center text-black mb-16">
      <FaCartPlus
        className="inline-block text-[10rem] cursor-pointer"
        onClick={handleButtonClick}
      />
      <h1 className="text-3xl font-bold mb-4">
        {IsLogin
          ? "Your Cart is currently Empty🙁"
          : "Please login to see your cart items"}
      </h1>
      <p className="text-lg mb-4">
        Before proceeding to checkout, you must add some products to your cart.
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
});

export default EmptyCart;
