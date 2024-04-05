import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Rate, message } from "antd";
import { calculateDiscountedPrice } from "@/utils/client/discountUtils";
import { BsCurrencyRupee } from "react-icons/bs";
import ReviewSection from "./ReviewSection";
import { FetchProductDetail } from "@/service/Product";

const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [Product, setProduct] = useState([]);
  const router = useRouter();
  const { productId } = router.query;
  useEffect(() => {
    if (productId) {
      console.log(productId, "dfghjkl;'");
      getProductDetail(productId);
      // console.log(productId,"productid");
    }
  }, [productId]);
  const getProductDetail = async (id) => {
    try {
      const data = await FetchProductDetail(id);
      console.log(data?.data?.data, "data");
      setProduct(data?.data?.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };
  const handleBuyNow = (productId) => {
    router.push({
      pathname: "/cart/address",
      query: { productId: productId },
    });
  };
  return (
    <div className="flex flex-wrap px-5 w-full">
      <div className="p-4 w-1/2">
        <div className="flex">
          {""}
          <div className="flex w-[20%] justify-between  flex-col space-y-2">
            {Product &&
              Product?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={Product.title}
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
              src={Product?.images?.[currentImageIndex]}
              alt={Product?.title}
              className="w-[300px] h-[400px] object-contain"
            />
          </div>
        </div>
        <div className="flex mt-2 justify-evenly">
          <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
          <button
            onClick={() => handleBuyNow(Product._id)}
            className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
      <div className="HideScroll flex-1 flex flex-col h-[88vh] overflow-y-auto w-1/2">
        <div className="">
          <p className="text-lg text-gray-700 mb-2">{Product.description}</p>
          <h2 className="text-2xl font-bold mb-2">{Product.title}</h2>
          <h2 className=" font-bold mb-2">Brand: {Product.brand}</h2>
          <h3 className=" mb-2">Category: {Product.category}</h3>
          <div className="mb-2">
            <Rate allowHalf disabled value={Product.rating} /> {Product.rating}
          </div>
          <div className="text-lg mb-2 text-[#26a541]">
            Number of Stock: <span className="text-black">{Product.stock}</span>
          </div>
          <p className="inline ">
            <BsCurrencyRupee className="inline text-xl font-semibold text-black" />
            <span className="text-xl text-black">
              {calculateDiscountedPrice(
                Product.price,
                Product.discountPercentage
              )}
            </span>
            <del className="text-black ml-2 font-normal ">
              {/* <BsCurrencyRupee className='inline text-black'/> */}
              {Product.price}
            </del>
            <span className="text-[#26a541] ml-2 font-bold">
              {Math.round(Product.discountPercentage)}%OFF
            </span>
          </p>
          <div className="flex items-center mt-2 gap-2 rounded-lg ">
            <button className="quantity-button bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded">
              -
            </button>
            <span className="text-lg font-semibold">Quantity: 22</span>
            <button className="quantity-button bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded">
              +
            </button>
          </div>
        </div>
        <ReviewSection reviews={Product?.reviews} />
      </div>
    </div>
  );
};

export default ProductDetail;
