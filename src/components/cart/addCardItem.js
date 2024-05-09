import Image from "next/image";
import React from "react";
function AddCardItem(props) {
  const {
    id,
    price,
    thumbnail,
    discountPercentage,
    stock,
    category,
    brand,
    title,
    description,
  } = props.cartItems;
  console.log(
    id,
    price,
    thumbnail,
    discountPercentage,
    stock,
    category,
    brand,
    title,
    description,
    "data"
  );
  return (
    <div className="border-b mt-1 text-black">
      <div className="flex gap-1 p-1 justify-between">
        <div>
          <Image src={thumbnail} width={100} height={50} />
        </div>
        <div>
          {/* <p>
            <strong className="mr-2">Category:</strong>
            {category}
          </p> */}
          <p>
            <strong className="mr-2">{brand}:</strong>
            {title}
          </p>
          <div className="flex items-center justify-center">
            <button className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 font-bold text-lg transition duration-300 hover:bg-gray-300 focus:outline-none">
              -
            </button>
            <input
              type="number"
              value={1}
              className="w-10 h-7 px-3 mx-2 border border-gray-300 rounded-md text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 font-bold text-lg transition duration-300 hover:bg-gray-300 focus:outline-none">
              +
            </button>
          </div>
          
        </div>
        <div>
          <p>Price-{price}</p>
        </div>
      </div>
    </div>
  );
}

export default AddCardItem;
