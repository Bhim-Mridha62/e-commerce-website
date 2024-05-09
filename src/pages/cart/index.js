"use client";

import EmptyCart from "@/components/cart/EmptyCart";
import AddCardItem from "@/components/cart/addCardItem";
import Image from "next/image";
import { useEffect, useState } from "react";

function index() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/1/1.jpg",
        "https://cdn.dummyjson.com/product-images/1/2.jpg",
        "https://cdn.dummyjson.com/product-images/1/3.jpg",
        "https://cdn.dummyjson.com/product-images/1/4.jpg",
        "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      ],
      quantity: 1,
    },
    {
      id: 2,
      title: "iPhone X",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: 899,
      discountPercentage: 17.94,
      rating: 4.44,
      stock: 34,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/2/1.jpg",
        "https://cdn.dummyjson.com/product-images/2/2.jpg",
        "https://cdn.dummyjson.com/product-images/2/3.jpg",
        "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      ],
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div>
        {cartItems.length !== 0 ? (
          cartItems?.map((data) => (
            <div
              key={data.id}
              className="border-b mt-4 py-4 text-black flex justify-between items-center"
            >
              <div className="flex gap-4">
                <div>
                  <Image src={data.thumbnail} width={100} height={100} alt="" />
                </div>
                <div>
                  <p>
                    <strong className="mr-2">{data.brand}:</strong>
                    {data.title}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 font-bold text-lg transition duration-300 hover:bg-gray-300 focus:outline-none"
                      onClick={() =>
                        handleQuantityChange(
                          data.id,
                          Math.max(data.quantity - 1, 1)
                        )
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={data.quantity}
                      className="w-10 h-7 px-3 mx-2 border border-gray-300 rounded-md text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      onChange={(e) =>
                        handleQuantityChange(data.id, parseInt(e.target.value))
                      }
                    />
                    <button
                      className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 font-bold text-lg transition duration-300 hover:bg-gray-300 focus:outline-none"
                      onClick={() =>
                        handleQuantityChange(data.id, data.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-bold">
                  Price: ${(data.price * data.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <EmptyCart />
        )}
      </div>
      {cartItems.length !== 0 && (
        <div className="mt-8 text-right">
          <p className="text-xl font-bold text-black">
            Total Price: ${getTotalPrice().toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}

export default index;
