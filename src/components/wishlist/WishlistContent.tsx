import { useAuthData } from "@/service/Auth";
import React, { memo, useEffect, useState } from "react";
import EmptyWishlist from "./EmptyWishlist";
import { useRouter } from "next/navigation";
import Loading from "../Loading/Loading";
import { useUser } from "@/context/authContext";
import { IProduct } from "@/types/types";
import { Rating } from "@fluentui/react-rating";
import Image from "next/image";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { TbArrowNarrowDown } from "react-icons/tb";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";

const WishlistContent = memo(() => {
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { Getwishlist, Deletewishlist } = useAuthData();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const res = await Getwishlist();
      if (res?.status === 200) {
        setWishlist(res?.data?.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      const res = await Deletewishlist({ productId: id });
      if (res?.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Productdetails = (id: string) => {
    router.push(`/product/${id}`);
  };

  if (loading && user) {
    return <Loading className="mt-4" />;
  }
  if (!user) {
    return <EmptyWishlist IsLogin={false} />;
  }
  if (!wishlist?.length) {
    return <EmptyWishlist IsLogin={true} />;
  }

  return (
    <div className="mx-auto px-2 md:px-20 py-8">
      <div className="flex flex-col items-center justify-center my-4">
        <h2 className="text-2xl font-bold text-gray-800">
          My Wishlist{" "}
          <span className="text-green-600">({wishlist.length})</span>
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Your saved items are waiting for you!
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-4 ">
        {wishlist.map((item: IProduct) => (
          <div
            key={item?._id}
            className="w-[300px] md:w-[338px] h-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative border rounded-md p-2 md:p-4"
          >
            <button
              className="absolute top-3 right-3 bg-theme-grey h-10 w-10 rounded-full flex justify-center items-center"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(item?._id);
              }}
            >
              <IoIosClose className="inline-flex text-4xl m-auto" />
            </button>
            <Link
              className=" h-48 cursor-pointer"
              href={`/product/${item?._id}`}
            >
              <Image
                src={item?.thumbnail || ""}
                alt={item?.title || ""}
                width={1000}
                height={1000}
                className="transition-transform w-full  h-48 object-contain duration-300 hover:scale-105"
              />
            </Link>
            <div className="py-2 flex flex-col justify-between gap-2">
              <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                {item?.title}
              </h2>
              {item?.price ? (
                <div className="flex items-center gap-2">
                  {item?.discountPercentage ? (
                    <div className="flex items-center text-sm text-gray-700">
                      <TbArrowNarrowDown className="inline-flex text-green-500 mr-1" />
                      <span className="text-green-500 font-semibold mr-2">
                        {item?.discountPercentage}%
                      </span>
                      <span className="line-through text-gray-500">
                        ₹
                        {Math.round(
                          item?.price / (item?.discountPercentage / 100)
                        )}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}

                  <span className="text-2xl font-bold text-green-600">
                    ₹{item?.price}
                  </span>
                </div>
              ) : (
                ""
              )}

              <div className="flex items-center">
                <Rating
                  value={Number(item?.rating)}
                  className="text-theme-golden pointer-events-none cursor-default"
                />
                <span className="ml-2 text-lg text-theme-text-grey">
                  {item?.rating}★
                </span>
              </div>
              <div className="flex justify-between items-center md:text-lg gap-1 md:gap-2">
                <button className="border-2 border-theme-black bg-theme-white py-1 px-3 text-theme-black hover:bg-theme-black hover:text-theme-white rounded-md hover:border-theme-black transition-colors duration-300 ease-in-out">
                  <IoCartOutline className="inline-flex mb-1 text-xl" /> Add to
                  Cart
                </button>
                <button
                  className="border-2 border-theme-green bg-theme-bg-green py-1 px-3 text-theme-green hover:bg-theme-green rounded-md hover:text-theme-white transition-colors duration-300 ease-in-out"
                  onClick={() => Productdetails(item?._id)}
                >
                  <MdKeyboardDoubleArrowRight className="inline-flex text-2xl mb-1" />{" "}
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
export default WishlistContent;
