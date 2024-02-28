import React, { useState } from "react";
import axios from "axios";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { calculateDiscountedPrice } from "@/utils/discountUtils";

const ProductDetail = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };
  console.log(product,"product");
  return (
    <div className="flex px-5 w-full">
      <div className="p-4 w-1/2">
        <div className="flex">
          <div className="flex w-[20%]  flex-col space-y-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={product.title}
                className={`w-16 h-16 cursor-pointer border ${
                  index === currentImageIndex
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
          <div className='"w-[80%] h-100%'>
            <img
              src={product.images[currentImageIndex]}
              alt={product.title}
              className="w-[300px] h-[400px] object-contain"
            />
          </div>
        </div>
        <div className="flex mt-2 justify-evenly">
          <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
          <button className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Buy Now
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between w-1/2">
        <div>
          <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <div className="flex mb-4">
            <p className="text-xl font-bold mr-2">${calculateDiscountedPrice(product.price, product.discountPercentage)}</p>
            {product.discountPercentage > 0 && (
              <p className="text-sm text-gray-500 line-through">${product.price}</p>
            )}
          </div>
          <p className="text-lg mb-4">Rating: {product.rating}</p>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { productId } = params;
  const { data: product } = await axios.get(
    `https://dummyjson.com/products/${productId}`
  );

  return {
    props: {
      product,
    },
  };
}

export default ProductDetail;
