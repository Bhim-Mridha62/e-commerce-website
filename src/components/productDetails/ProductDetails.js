import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { message } from "antd";
import { calculateDiscountedPrice } from "@/utils/discountUtils";

const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [Product, setProduct] = useState([]);
  const router = useRouter();
  const { productId } = router.query;
  useEffect(() => {
    if (productId) {
      getProductDetail(productId);
      // console.log(productId,"productid");
    }
  }, [productId]);
  const getProductDetail = async (id) => {
    try {
      await axios
        .get(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response?.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          message.error(error.response.data.message);
        });
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
  console.log(
    Product && Product.images ? Product.images[0] : productId,
    "abcd"
  );
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
            onClick={() => handleBuyNow(Product.id)}
            className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between w-1/2">
        <div>
          <h2 className="text-2xl font-bold mb-4">{Product.title}</h2>
          <p className="text-lg text-gray-700 mb-4">{Product.description}</p>
          <div className="flex mb-4">
            <p className="text-xl font-bold mr-2">
              $
              {calculateDiscountedPrice(
                Product.price,
                Product.discountPercentage
              )}
            </p>
            {Product.discountPercentage > 0 && (
              <p className="text-sm text-gray-500 line-through">
                ${Product.price}
              </p>
            )}
          </div>
          <p className="text-lg mb-4">Rating: {Product.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
