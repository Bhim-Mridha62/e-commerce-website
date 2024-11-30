import { useAuthData } from "@/service/Auth";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import EmptyWishlist from "./EmptyWishlist";
import { useRouter } from "next/router";
import Loading from "../Loading/Loading";
import { useUser } from "@/context/authContext";
import { IProduct } from "@/types/types";
import { Rating } from "@fluentui/react-rating";

const WishlistContent = () => {
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { Getwishlist, Deletewishlist } = useAuthData();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchData();
    } else {
      setLoading(false); // End loading
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
      setLoading(false); // End loading
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

  if (loading) {
    return <Loading className="mt-4" />;
  }

  return user ? (
    wishlist.length ? (
      <div className="text-black">
        <div className="p-1 tsm:p-4">
          <h1 className="text-xl font-bold mb-4">
            My Wishlist ({wishlist.length})
          </h1>
          <div className="space-y-4">
            {wishlist.map((item: IProduct) => (
              <div
                key={item?._id}
                className="flex flex-row items-center justify-between p-1 tsm:p-4 border rounded-lg shadow space-y-4 sm:space-y-0"
              >
                <img
                  onClick={() => Productdetails(item?._id)}
                  src={item?.thumbnail}
                  alt={item?.title}
                  className="w-20 h-20 object-cover cursor-pointer"
                />
                <div className="flex-grow mx-4 text-left">
                  <h2 className="text-lg font-semibold">{item?.title}</h2>
                  <div className="flex flex-row items-center justify-start space-y-2 sm:space-y-0 sm:space-x-2">
                    <span className="text-green-500 font-bold">
                      ₹{item?.price}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="line-through text-gray-500">
                        ₹{item?.price}
                      </span>
                      <span className="text-green-500">
                        {item?.discountPercentage}% off
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <Rating
                      size="large"
                      step={0.5}
                      className="text-theme-golden pointer-events-none cursor-default"
                      value={Number(item?.rating)}
                    />
                    {44 > 0 && (
                      <span className="mx-2 text-sm text-theme-blue">
                        {`Rated by ${44} people`}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item?._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <EmptyWishlist IsLogin={true} />
    )
  ) : (
    <EmptyWishlist IsLogin={false} />
  );
};

export default WishlistContent;
