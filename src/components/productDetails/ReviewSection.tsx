// ReviewSection.js
import { useAuthData } from "@/service/Auth";
import React, { memo, useEffect, useState } from "react";
import { IProductReview, IReviewStars } from "@/types/types";
// import { GoChevronRight } from "react-icons/go";
import {
  getLetterColors,
  getRatingColourText,
} from "@/utils/client/colourCode";
import { formatDate } from "@/utils/client/formatDate";
import { BiSolidLike } from "react-icons/bi";
import ReviewStarComponents from "./reviewStarComponents";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Image } from "antd";

const ReviewSection = memo(
  ({
    id,
    setRateing,
  }: {
    id: string;
    setRateing?: React.Dispatch<
      React.SetStateAction<{
        avg_rating: number;
        total_Rating: number;
      }>
    >;
  }) => {
    const [reviews, setReviews] = useState<IProductReview[]>([]);
    const [stars, setStars] = useState<IReviewStars>({
      averageRating: 0,
      totalRatings: 0,
      "1_star": 0,
      "2_star": 0,
      "3_star": 0,
      "4_star": 0,
      "5_star": 0,
    });
    const { getreviews, putreviews } = useAuthData();
    const [likeId, setLikeId] = useState<string[]>([]);
    // const [expandedImage, setExpandedImage] = useState<string | null>(null);
    useEffect(() => {
      if (id) {
        getReviewData(id);
      }
    }, [id]);

    const getReviewData = async (id: string) => {
      try {
        const res = await getreviews(id);
        if (res?.status === 200) {
          console.log(res, "revive data");
          setReviews(res?.data?.data?.review);
          setStars(res?.data?.data?.stars);
          if (setRateing) {
            setRateing({
              avg_rating: res?.data?.data?.stars?.averageRating,
              total_Rating: res?.data?.data?.stars?.totalRatings,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handleActionLikeClick = async (id: string) => {
      if (likeId.includes(id)) {
        return;
      }
      setLikeId((prev) => [...prev, id]);
      try {
        await putreviews({ like: true, _id: id });
      } catch (error) {
        console.error(error);
      }
    };
    // const HandelDeleteReview = async (reviewId: string) => {
    //   try {
    //     const res = await Deletereviews({
    //       productID: id,
    //       review_id: reviewId,
    //     });
    //     if (res?.status === 200) {
    //       setReviews((prevReviews) =>
    //         prevReviews.filter((review: any) => review?._id !== reviewId)
    //       );
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    const HandelAllReview = () => {
      //  router.push({
      //   pathname:"/product/allreview",
      //   query:{id:id},
      //  })
    };
    if (reviews?.length === 0) {
      return "";
    }
    return (
      <div className="border-t mt-2">
        <h2 className="text-xl font-semibold text-gray-800 my-4">
          Product Ratings & Reviews
        </h2>

        {/* Star Statistics */}
        <ReviewStarComponents stars={stars} />

        {/* Reviews */}
        <div className="space-y-2">
          {reviews?.length &&
            reviews?.map((review: IProductReview) => (
              <div key={review._id} className="border-b pb-3">
                <div className="flex items-center gap-2 mb-2">
                  {review?.profile_pic ? (
                    <img
                      className="w-9 h-9 rounded-full"
                      src={review?.profile_pic}
                      alt="avatar"
                      onError={(e: any) => (e.target.src = "/user.png")}
                    />
                  ) : (
                    <p
                      style={getLetterColors(review.name?.charAt(0) || "G")}
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                    >
                      {review.name?.charAt(0) || "G"}
                    </p>
                  )}
                  <div>
                    <div className="font-medium">{review?.name || "Guest"}</div>
                    <div className="text-sm text-gray-500">
                      {formatDate(review.createdAt)}
                    </div>
                  </div>
                </div>

                <div
                  className="flex mb-2 w-fit rounded-xl px-2 text-theme-white"
                  style={{
                    backgroundColor: getRatingColourText(review?.rating)
                      .colorCode,
                  }}
                >
                  {review?.rating}.0 ★
                </div>

                <p className="mb-4">{review?.comment}</p>

                {review?.images?.length > 0 && (
                  <div className="flex gap-2 mb-2">
                    {review.images.map((image, index) => (
                      <button
                        key={index}
                        className="relative w-14 h-14 overflow-hidden rounded-lg object-cover"
                        // onClick={() => setExpandedImage(image)}
                      >
                        <Image
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="object-cover"
                          preview={{ src: image }}
                        />
                      </button>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => handleActionLikeClick(review?._id as string)}
                  className="flex items-center gap-2 text-gray-500"
                >
                  <BiSolidLike
                    className="text-xl"
                    style={{
                      color: likeId.includes(review?._id) ? "blue" : "gray",
                    }}
                  />
                  Helpful{" "}
                  {likeId?.includes(review?._id)
                    ? `(${review?.like + 1})`
                    : review?.like
                    ? `(${review?.like})`
                    : ""}
                </button>
              </div>
            ))}
        </div>
        <p
          onClick={HandelAllReview}
          className=" cursor-pointer text-xs md:text-base text-theme-red flex items-center gap-2 font-semibold mt-3 mb-2"
        >
          VIEW ALL REVIEWS{" "}
          <IoIosArrowDroprightCircle className="text-theme-red size-6 md:size-7" />
        </p>
      </div>
    );
  }
);

export default ReviewSection;
