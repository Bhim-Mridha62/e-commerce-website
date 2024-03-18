import { useRouter } from "next/router";
import React from "react";
import { FaCartPlus } from "react-icons/fa";
function EmptyCart() {
  const router = useRouter();
  return (
    <div className="text-center">
      <FaCartPlus className="inline-block text-[10rem] cursor-pointer" onClick={() => router.push("/")}/>
      <h1 className="text-3xl font-bold mb-4">
        Your Cart is currently Empty🙁
      </h1>
      <p className="text-lg mb-4">
        Before proceeding to checkout, you must add some products to your cart.
      </p>
      <p className="text-lg mb-8">
        You will find a lot of interesting products on our "Shop" page.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        onClick={() => router.push("/")}
      >
        🛒 RETURN TO SHOP
      </button>
    </div>
  );
}

export default EmptyCart;
