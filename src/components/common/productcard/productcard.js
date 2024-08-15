import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import { BsCurrencyRupee } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import stylehome from "./ProductCard.module.css";
import { calculateDiscountedPrice } from "@/utils/client/discountUtils";
import { useRouter } from "next/router";
import isMobile from "@/utils/client/isMobile";
import { FaRegHeart } from "react-icons/fa6";
import { useAuthData } from "@/service/Auth";
import Image from "next/image";
const ProductCard = ({ product ,user }) => {
  const [islike, setLslike] = useState(false);
  const { Postwishlist } = useAuthData();

  const handleAddwishlist = async (event, id) => {
    event.stopPropagation();
    setLslike(!islike);
    
    try {
      await Postwishlist({ productId: id });
    } catch (error) {
      console.error(error);
    }
  };
  const router = useRouter();
  const Mobile = isMobile();
  const Productdetails = (id) => {
    router.push(`/product/${id}`);
  };

  return (
    <div
      onClick={() => Productdetails(product._id)}
      className=" md:w-[200px] md:min-w-[200px] w-[150px] min-w-[150px] h-auto border border-gray-300 relative"
    >
      {user && (
        <span
          className="absolute right-1 top-1"
          onClick={(event) => handleAddwishlist(event, product._id)}
        >
          {islike ? (
            <FcLike className="text-black text-2xl" />
          ) : (
            <FaRegHeart className="text-black text-2xl" />
          )}
        </span>
      )}
      <Image
        className={stylehome.ProductshowImg}
        src={product.thumbnail}
        layout="responsive"
        height={100}
        width={100}
        alt="Image here"
      />
      <p className="w-full font-semibold md:font-bold overflow-hidden text-black truncate">
        {product.title}
      </p>
      <p className="text-black text-[15px] md:text-[20px]">
        <Rate
          style={{ fontSize: Mobile ? 15 : 20 }}
          allowHalf
          disabled
          value={product.rating}
        />
        <span>{product.rating}</span>
      </p>
      <p className="inline text-sm">
        <span className="text-black">
          <BsCurrencyRupee className="inline text-black" />
          {product.price}
        </span>
        <del className="text-black ml-1 font-bold">
          {/* <BsCurrencyRupee className='inline text-black'/> */}
          {calculateDiscountedPrice(product.price, product.discountPercentage)}
        </del>
        <span className="text-[#26a541] font-bold">
          {Math.round(product.discountPercentage)}%OFF
        </span>
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
