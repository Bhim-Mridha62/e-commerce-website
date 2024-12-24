import React, { memo, useEffect } from "react";
import { Divider } from "antd";
import { useState } from "react";
import { useAuthData } from "@/service/Auth";
import { calculateDiscountedPrice } from "@/utils/client/discountUtils";
import { encodeData } from "@/utils/client/encoding";
import { useRouter } from "next/router";
import Link from "next/link";
import { Rating } from "@fluentui/react-rating";
import QuantityButton from "../productDetails/quantityButton";
import SizeSelector from "../productDetails/sizeSelector";
import Image from "next/image";
//@ts-ignore
const ProductCard = memo(({ product, HandelRemove, UpdateProductData }) => {
  const [quantity, setQuantity] = useState<any>(1);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const router = useRouter();
  const { AddToCart } = useAuthData();
  useEffect(() => {
    setQuantity(product?.quantity);
    setSelectedSize(product?.Size);
  }, []);
  const HandelAddToCart = async (
    Size: string,
    productId: string,
    qty: number
  ) => {
    try {
      await AddToCart({
        Size: Size,
        productId: productId,
        quantity: qty,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyNow = () => {
    const { title, discountPercentage, price, thumbnail, _id } = product;
    //@ts-ignore
    const encodedQuery = encodeData({
      title,
      discountPercentage,
      price,
      thumbnail,
      quantity,
      selectedSize,
      _id,
    });
    router.push(`/checkout?data=${encodedQuery}`);
  };
  return (
    <>
      <div className="md:flex text-black p-2 md:p-4">
        <div className="md:w-1/4 bg-theme-grey">
          <Link href={`/product/${product?._id}`}>
            <Image
              src={product?.thumbnail}
              alt={product?.title}
              width={1000}
              height={1000}
              className="object-contain w-64 h-auto"
            />
          </Link>
        </div>
        <div className="md:w-3/4 md:pl-4">
          <h2 className="text-lg font-bold">{product?.title}</h2>
          <div className="mb-2 flex gap-2 items-center">
            Size:{" "}
            <SizeSelector
              sizes={product?.sizes}
              selectedSize={selectedSize}
              setSelectedSize={(value) => {
                setSelectedSize(value),
                  UpdateProductData(value, product?._id, quantity),
                  HandelAddToCart(value, product?._id, quantity);
              }}
            />
          </div>
          <div className="flex items-center mb-2">
            <Rating
              size="large"
              step={0.5}
              className="text-theme-golden pointer-events-none cursor-default"
              value={Number(product?.rating)}
            />
            {44 > 0 && (
              <span className="mx-2 text-sm text-theme-blue">
                {`Rated by ${44} people`}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 rounded-lg">
            <QuantityButton
              quantity={quantity}
              setQuantity={(value: number) => {
                setQuantity(Number(value));
                UpdateProductData(selectedSize, product?._id, Number(value));
                HandelAddToCart(selectedSize, product?._id, Number(value));
              }}
            />
          </div>
          <div className="flex items-center mb-2">
            <span className="text-gray-500 line-through">
              ₹
              {calculateDiscountedPrice(
                product?.price,
                product?.discountPercentage
              ) * quantity}
            </span>
            <span className="ml-2 text-xl font-bold">
              ₹{product?.price * quantity}
            </span>
            <span className="ml-2 text-green-600">
              {Math.round(product?.discountPercentage)}% off
            </span>
          </div>
          <p className="text-[#000000a1]">
            Delivery by {"May 24 ,fri"}{" "}
            <del className="font-semibold mx-1"> ₹40</del>
            <span className="text-green-600">FREE</span>
          </p>
          <div className="flex mt-4 gap-2">
            <button
              onClick={() => HandelRemove(product?._id)}
              className="border-2 border-theme-red bg-theme-white text-theme-red py-1 px-4 hover:bg-theme-red hover:text-theme-white hover:border-theme-red transition-colors duration-300 ease-in-out"
            >
              Remove
            </button>
            <button
              onClick={handleBuyNow}
              className="border-2 border-theme-black bg-theme-white py-1 px-4 text-theme-black hover:bg-theme-black hover:text-theme-white hover:border-theme-black transition-colors duration-300 ease-in-out"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
});

export default ProductCard;
