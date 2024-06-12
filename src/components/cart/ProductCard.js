import React, { useEffect } from "react";
import { Button, Divider, Rate, Select } from "antd";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useState } from "react";
import { useAuthData } from "@/service/Auth";

const ProductCard = ({ product, HandelRemove }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const { AddToCart } = useAuthData();
  useEffect(() => {
    setQuantity(product?.quantity);
    setSelectedSize(product?.Size);
  }, []);
  // const HandelAddToCart = async () => {
  //   console.log(selectedSize, product?._id, quantity, "quantity");
  //   try {
  //     await AddToCart({
  //       Size: selectedSize,
  //       productId: product?._id,
  //       quantity: quantity,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      <div className="mb-4 p-2 md:p-4">
        <div className="flex text-black">
          <div className="w-1/4">
            <img
              src={product?.thumbnail}
              alt={product?.title}
              className="w-full h-auto rounded"
            />
            <div className="relative flex items-center mt-3">
              <span className="absolute left-[10px] pointer-events-none">
                Qty:
              </span>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e?.target?.value)}
                min={1}
                type="number"
                className="pl-[40px] outline-none border border-gray-400 border-opacity-40 rounded-md w-full"
              />
            </div>
          </div>
          <div className="w-3/4 pl-4">
            <h2 className="text-lg font-bold">{product?.title}</h2>
            <p className="mb-2">
              Size:{" "}
              <Select
                style={{ width: 130 }}
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
            </p>
            {/* <p className="mb-2">Brand: {product.brand}</p> */}
            <div className="flex items-center mb-2">
              <Rate className="text-xs" value={product?.rating} disabled />
              <span className="ml-2 text-sm">(55)</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="text-gray-500 line-through">
                ₹{product?.price}
              </span>
              <span className="ml-2 text-xl font-bold">
                ₹
                {(
                  product?.price -
                  (product?.price * product?.discountPercentage) / 100
                ).toFixed(2)}
              </span>
              <span className="ml-2 text-green-600">
                {product?.discountPercentage}% off
              </span>
            </div>
          </div>
        </div>
        <p className="text-[#000000a1]">
          Delivery by {"May 24 ,fri"}{" "}
          <del className="font-semibold mx-1"> ₹40</del>
          <span className="text-green-600">FREE</span>
        </p>
        <div className="flex justify-center mt-4 gap-2">
          <Button
            onClick={() => HandelRemove(product?._id)}
            icon={<MdOutlineDeleteForever />}
            className="bg-red-500 text-white"
          >
            Remove
          </Button>
          <Button className="bg-[#1677ff]" type="primary">
            Buy this now
          </Button>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default ProductCard;
