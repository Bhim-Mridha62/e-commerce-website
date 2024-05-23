import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Rate, Select, message } from "antd";
import { calculateDiscountedPrice } from "@/utils/client/discountUtils";
import { BsCurrencyRupee } from "react-icons/bs";
import ReviewSection from "./ReviewSection";
import { FetchProductDetail } from "@/service/Product";

const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const [Product, setProduct] = useState([]);
  const [Product, setProduct] = useState({
    "_id": "65ff184d28d7c182b26fedcb",
    "title": "NIGHT SUIT",
    "description": "NIGHT SUIT RED MICKY MOUSE..  For Girls. Fantastic Suits.",
    "price": 55,
    "discountPercentage": 15.05,
    "rating": 4.65,
    "stock": 21,
    "brand": "RED MICKY MOUSE..",
    "category": "womens-dresses",
    "thumbnail": "https://cdn.dummyjson.com/product-images/41/thumbnail.webp",
    "images": [
        "https://cdn.dummyjson.com/product-images/41/1.jpg",
        "https://cdn.dummyjson.com/product-images/41/2.webp",
        "https://cdn.dummyjson.com/product-images/41/3.jpg",
        "https://cdn.dummyjson.com/product-images/41/4.jpg",
        "https://cdn.dummyjson.com/product-images/41/thumbnail.webp"
    ],
    "reviews": [
        {
            "username": "Sara Andersen",
            "userImage": "https://randomuser.me/api/portraits/women/58.jpg",
            "rating": 3,
            "like": 43,
            "dislike": 87,
            "comment": "adult Labrador retriever",
            "postdAt": "2020-05-24T14:53:17.598Z",
            "_id": "65fff07925907ed917f8bcbb"
        },
        {
            "username": "Margarita Vicente",
            "userImage": "https://randomuser.me/api/portraits/med/women/5.jpg",
            "rating": 1,
            "like": 31,
            "dislike": 10,
            "comment": "ice caves in the wild landscape photo of ice near ...",
            "postdAt": "2020-05-24T07:44:17.738Z",
            "_id": "65fff07925907ed917f8bcbc"
        },
        {
            "username": "Kayla Bredesen",
            "userImage": "https://randomuser.me/api/portraits/med/women/13.jpg",
            "rating": 0,
            "like": 16,
            "dislike": 64,
            "comment": "@adventure.yuki frozen grass short-coated black do...",
            "postdAt": "2020-05-24T05:44:55.297Z",
            "_id": "65fff07925907ed917f8bcbd"
        },
        {
            "username": "Sibylle Leibold",
            "userImage": "https://randomuser.me/api/portraits/med/women/89.jpg",
            "rating": 5,
            "like": 7,
            "dislike": 35,
            "comment": "Hiking with my dog in the woods. black labrador re...",
            "postdAt": "2020-05-23T22:56:11.424Z",
            "_id": "65fff07925907ed917f8bcbe"
        },
        {
            "username": "Jolanda Lacroix",
            "userImage": "https://randomuser.me/api/portraits/med/women/32.jpg",
            "rating": 4,
            "like": 28,
            "dislike": 14,
            "comment": "Two boys hug their dogs in a leaf pile in the fall...",
            "postdAt": "2020-05-23T18:52:32.613Z",
            "_id": "65fff07925907ed917f8bcbf"
        },
        {
            "username": "Pwry Shylyrd",
            "userImage": "https://randomuser.me/api/portraits/med/men/37.jpg",
            "rating": 3,
            "like": 18,
            "dislike": 52,
            "comment": "Bone salt and pepper schnauzer puppy",
            "postdAt": "2020-05-23T14:42:22.808Z",
            "_id": "65fff07925907ed917f8bcc0"
        },
        {
            "username": "Kaya Basoglu",
            "userImage": "https://randomuser.me/api/portraits/med/men/59.jpg",
            "rating": 1,
            "like": 19,
            "dislike": 78,
            "comment": "Sleeping dogs lie two dogs lying on black textile",
            "postdAt": "2020-05-23T12:55:22.576Z",
            "_id": "65fff07925907ed917f8bcc1"
        },
        {
            "username": "Vanessa Ramos",
            "userImage": "https://randomuser.me/api/portraits/med/women/33.jpg",
            "rating": 0,
            "like": 242,
            "dislike": 32,
            "comment": "Dog in a forest at sunset dog in forest with sun r...",
            "postdAt": "2020-05-22T22:27:12.912Z",
            "_id": "65fff07925907ed917f8bcc2"
        },
        {
            "username": "Pwry Shylyrd",
            "userImage": "https://randomuser.me/api/portraits/med/men/37.jpg",
            "rating": 4,
            "like": 79,
            "dislike": 91,
            "comment": "black and white Husky",
            "postdAt": "2020-05-22T20:05:03.653Z",
            "_id": "65fff07925907ed917f8bcc3"
        },
        {
            "username": "Rudi Droste",
            "userImage": "https://randomuser.me/api/portraits/med/men/83.jpg",
            "rating": 2,
            "like": 17,
            "dislike": 29,
            "comment": "Milo durmiendo después de un largo día de jugar en...",
            "postdAt": "2020-05-22T07:50:38.093Z",
            "_id": "65fff07925907ed917f8bcc4"
        }
    ],
    "__v": 1
});
  const router = useRouter();
  const { productId } = router.query;
  useEffect(() => {
    if (productId) {
      getProductDetail(productId);
    }
  }, [productId]);
  const getProductDetail = async (id) => {
    try {
      const data = await FetchProductDetail(id);
      // setProduct(data?.data?.data);
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
      <div className="HideScroll flex-1 flex flex-col h-[88vh] overflow-y-auto w-full md:w-1/2">
        <div className="text-black">
          <p className="text-lg text-gray-700 mb-2">{Product.description}</p>
          <div className="">
            Size : {" "}
            {/* <div className="flex justify-between">
              <p className="rounded p-2 bg-[#80808029]">S</p>
              <p className="rounded p-2 bg-[#80808029]">M</p>
              <p className="rounded p-2 bg-[#80808029]">L</p>
              <p className="rounded p-2 bg-[#80808029]">XL</p>
              <p className="rounded p-2 bg-[#80808029]">2XL</p>
              <p className="rounded p-2 bg-[#80808029]">3XL</p>
            </div> */}
            <Select
              style={{
                width: 200,
              }}
              placeholder=" Select Size"
              optionFilterProp="children"
              // filterOption={(input, option) =>
              //   (option?.label ?? "").includes(input)
              // }
              // filterSort={(optionA, optionB) =>
              //   (optionA?.label ?? "")
              //     .toLowerCase()
              //     .localeCompare((optionB?.label ?? "").toLowerCase())
              // }
              options={[
                {
                  value: "1",
                  label: "S",
                },
                {
                  value: "2",
                  label: "M",
                },
                {
                  value: "3",
                  label: "L",
                },
                {
                  value: "4",
                  label: "XL",
                },
                {
                  value: "5",
                  label: "2XL",
                },
                {
                  value: "6",
                  label: "3XL",
                },
              ]}
            />
          </div>
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
