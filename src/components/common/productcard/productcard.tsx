import React, { useState } from "react";
import { Rate } from "antd";
import { FcLike } from "react-icons/fc";
import { calculateDiscountedPrice } from "@/utils/client/discountUtils";
import { useRouter } from "next/router";
import { FaRegHeart } from "react-icons/fa6";
import { useAuthData } from "@/service/Auth";
import Image from "next/image";
import { Product } from "@/types/types";
const ProductCard = ({ product, user }: { product: Product; user?: any }) => {
  const [islike, setLslike] = useState(false);
  const { Postwishlist } = useAuthData();

  const handleAddwishlist = async (
    event: React.MouseEvent<HTMLSpanElement>,
    id: string
  ) => {
    event.stopPropagation();
    setLslike(!islike);

    try {
      await Postwishlist({ productId: id });
    } catch (error) {
      console.error(error);
    }
  };
  const router = useRouter();
  const Productdetails = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <div
      onClick={() => Productdetails(product?._id)}
      className="w-[200px] h-[300px] relative"
    >
      {product?.discountPercentage > 30 && (
        <span className="bg-theme-red text-theme-white rounded-tl-lg text-xs absolute left-0 top-0 py-2 px-1 rounded-br-lg">
          -{product?.discountPercentage}%
        </span>
      )}
      {user && (
        <span
          className="absolute right-1 top-1 bg-theme-white rounded-full p-2"
          onClick={(event) => handleAddwishlist(event, product?._id)}
        >
          {islike ? (
            <FcLike className="text-black text-xl" />
          ) : (
            <FaRegHeart className="text-black text-xl" />
          )}
        </span>
      )}
      <div className="w-full bg-theme-grey  rounded-lg">
        <Image
          className="w-full h-auto mb-2 aspect-[5/5] object-contain mix-blend-multiply"
          src={product?.thumbnail}
          layout="responsive"
          height={100}
          width={100}
          alt="Image here"
        />
      </div>
      <p className="w-full font-semibold md:font-bold overflow-hidden text-black truncate">
        {product?.title}
      </p>
      <p className="">
        <Rate
          allowHalf
          disabled
          className="text-base"
          value={product?.rating}
        />
        <span className="text-theme-border px-1 rounded text-sm ml-1">
          ({product?.rating?.toFixed(1)}★)
        </span>
        {/* <span className="bg-theme-green px-1 rounded text-sm ml-1">
          {product.rating?.toFixed(1)}★
        </span> */}
      </p>
      <p className="flex gap-2 text-sm">
        <span className="text-theme-green font-semibold">
          ₹{product?.price}
        </span>
        <del className="font-semibold text-theme-red">
          ₹
          {calculateDiscountedPrice(
            product?.price,
            product?.discountPercentage
          )}
        </del>
        {/* <span className="text-theme-white bg-theme-red rounded-md text-xs px-1">
          -{Math.round(product.discountPercentage)}%
        </span> */}
      </p>
      {/* <div className={stylehome.buyandadddiv}>
        <button style={{ background: 'rgb(235 154 101)' }} onClick={() => buynowbutton({ product, count: 1 })}>Buy now</button>
        <button onClick={() => HandelAddtoCart(product.id)} className={stylehome.Productaddbutton}>
          Add to <RiShoppingCart2Fill />
        </button>
      </div> */}
    </div>
  );
};

export default ProductCard;
