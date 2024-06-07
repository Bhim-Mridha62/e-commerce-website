import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Rate, Select, message } from "antd";
import { calculateDiscountedPrice } from "@/utils/client/discountUtils";
import { BsCurrencyRupee } from "react-icons/bs";
import ReviewSection from "./ReviewSection";
// import { FetchProductDetail } from "@/service/Product";
import { useAuthData } from "@/service/Auth";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa6";

const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [Product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [user, setUser] = useState(false);
  const [islike, setLslike] = useState(false);

  const router = useRouter();
  const { AddToCart, FetchProductDetail, Postwishlist } = useAuthData();
  const { productId } = router.query;
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserString = localStorage.getItem("User");
      const storedUser = storedUserString ? JSON.parse(storedUserString) : "";
      setUser(storedUser ? true : false);
    }

    if (productId) {
      getProductDetail(productId);
    }
  }, [productId]);
  const handleAddwishlist = async (id) => {
    setLslike(!islike);
    try {
      await Postwishlist({ productId: id });
    } catch (error) {
      console.error(error);
    }
  };
  const getProductDetail = async (id) => {
    try {
      const data = await FetchProductDetail(id);
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
  const HandelAddToCart = async (id) => {
    try {
      if (!selectedSize) {
        message.info("Please Select Size");
      } else {
        const res = await AddToCart({
          Size: selectedSize,
          productId: id,
          quantity: quantity,
        });
        if (res?.status === 200) {
          router.push("/cart");
        } else {
          message.error("Somthing please try again");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const HandelMinusQuantity = () => {
    if (!selectedSize) {
      message.info("Please Select Size");
      return;
    }
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const HandeAddQuantity = () => {
    if (selectedSize) {
      setQuantity(quantity + 1);
    } else {
      message.info("Please Select Size");
    }
  };
  return (
    <div className="flex flex-col md:flex-row flex-wrap px-2 md:px-5 w-full">
      <div className="pt-4 md:p-4 w-full md:w-1/2">
        <div className="flex gap-2">
          {""}
          <div className="flex w-[20%] justify-between  flex-col space-y-2">
            {Product &&
              Product?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={Product.title}
                  className={`w-16 h-16 cursor-pointer object-contain border ${
                    index === currentImageIndex
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleImageClick(index)}
                />
              ))}
          </div>
          <div className='"w-[80%] h-100% relative'>
            {user && (
              <span
                className="absolute right-1 top-1"
                onClick={() => handleAddwishlist(Product._id)}
              >
                {islike ? (
                  <FcLike className="text-black text-2xl" />
                ) : (
                  <FaRegHeart className="text-black text-2xl" />
                )}
              </span>
            )}
            <img
              src={Product?.images?.[currentImageIndex]}
              alt={Product?.title}
              className="w-[300px] h-[400px] object-contain"
            />
          </div>
        </div>
        <div className="flex mt-2 justify-evenly">
          <button
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => HandelAddToCart(Product?._id)}
          >
            Add to Cart
          </button>
          <button
            onClick={() => handleBuyNow(Product?._id)}
            className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
      <div className="HideScroll flex-1 flex flex-col h-[88vh] overflow-y-auto w-full md:w-1/2">
        <div className="text-black">
          <p className="text-lg text-gray-700 mb-2">{Product?.description}</p>
          <div className="">
            Size :{" "}
            {/* <div className="flex justify-between">
              <p className="rounded p-2 bg-[#80808029]">S</p>
              <p className="rounded p-2 bg-[#80808029]">M</p>
              <p className="rounded p-2 bg-[#80808029]">L</p>
              <p className="rounded p-2 bg-[#80808029]">XL</p>
              <p className="rounded p-2 bg-[#80808029]">2XL</p>
              <p className="rounded p-2 bg-[#80808029]">3XL</p>
            </div> */}
            <Select
              style={{ width: 200 }}
              placeholder="Select Size"
              optionFilterProp="children"
              value={selectedSize}
              onChange={(value) => setSelectedSize(value)}
              options={[
                { value: "S", label: "S" },
                { value: "M", label: "M" },
                { value: "L", label: "L" },
                { value: "XL", label: "XL" },
                { value: "2XL", label: "2XL" },
                { value: "3XL", label: "3XL" },
              ]}
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">{Product?.title}</h2>
          <h2 className=" font-bold mb-2">Brand: {Product?.brand}</h2>
          <h3 className=" mb-2">Category: {Product?.category}</h3>
          <div className="mb-2">
            <Rate allowHalf disabled value={Product?.rating} />{" "}
            {Product?.rating}
          </div>
          <div className="text-lg mb-2 text-[#26a541]">
            Number of Stock:{" "}
            <span className="text-black">{Product?.stock}</span>
          </div>
          <p className="inline ">
            <BsCurrencyRupee className="inline text-xl font-semibold text-black" />
            <span className="text-xl text-black">
              {calculateDiscountedPrice(
                Product?.price,
                Product?.discountPercentage
              )}
            </span>
            <del className="text-black ml-2 font-normal ">
              {/* <BsCurrencyRupee className='inline text-black'/> */}
              {Product?.price}
            </del>
            <span className="text-[#26a541] ml-2 font-bold">
              {Math.round(Product?.discountPercentage)}%OFF
            </span>
          </p>
          <div className="flex items-center mt-2 gap-2 rounded-lg ">
            <button
              onClick={HandelMinusQuantity}
              className="quantity-button bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
            >
              -
            </button>
            <span className="text-lg font-semibold">Quantity: {quantity}</span>
            <button
              onClick={HandeAddQuantity}
              className="quantity-button bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
            >
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
