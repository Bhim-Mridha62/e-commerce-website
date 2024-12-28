import React, { memo, useState } from "react";
import { FcLike } from "react-icons/fc";
import { calculateDiscountedPrice } from "@/utils/client/discountUtils";
import { useRouter } from "next/router";
import { FaRegHeart } from "react-icons/fa6";
import { useAuthData } from "@/service/Auth";
import Image from "next/image";
import { Product } from "@/types/types";
import { Rating } from "@fluentui/react-rating";
const ProductCard = memo(
  ({
    product,
    user,
    isBestSelling = false,
    isMobile = false,
  }: {
    product: Product;
    user?: any;
    isBestSelling?: boolean;
    isMobile?: boolean;
  }) => {
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
        className="w-[140px] md:w-[200px] h-[250px] md:h-[300px] relative"
      >
        {isBestSelling ? (
          <span className="Best-seller-label">Best seller</span>
        ) : product?.discountPercentage > 30 ? (
          <span className="bg-theme-red text-theme-white rounded-tl-lg text-xs absolute left-0 top-0 py-2 px-1 rounded-br-lg">
            -{product?.discountPercentage}%
          </span>
        ) : (
          ""
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
        <p className="flex items-center">
          <Rating
            size={isMobile ? "medium" : "large"}
            step={0.5}
            className="text-theme-golden pointer-events-none cursor-default"
            value={Number(product?.rating)}
          />
          <span className="text-theme-border md:px-1 rounded text-xs md:text-sm ml-1">
            ({product?.rating}★)
          </span>
        </p>
        <p className="flex gap-1 text-xs items-center">
          <span className="text-theme-green font-semibold">
            ₹{product?.price}
          </span>
          {product?.discountPercentage > 0 && (
            <>
              <del className="font-semibold text-theme-red text-xs md:text-sm">
                ₹
                {calculateDiscountedPrice(
                  product?.price,
                  product?.discountPercentage
                )}
              </del>
              {(product?.discountPercentage <= 30 || isBestSelling) && (
                <span className="bg-theme-green text-theme-white rounded px-1">
                  -{product?.discountPercentage}%
                </span>
              )}
            </>
          )}
        </p>
      </div>
    );
  }
);

export default ProductCard;
