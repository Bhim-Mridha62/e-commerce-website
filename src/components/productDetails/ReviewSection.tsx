// ReviewSection.js
import { useUser } from "@/context/authContext";
import { useAuthData } from "@/service/Auth";
import { Button, List, message } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem"; // Import the new component

function ReviewSection({ id }) {
  const [review, setReview] = useState([]);
  const { getreviews, putreviews, Deletereviews } = useAuthData();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      getReviewData(id);
    }
  }, [id]);

  const getReviewData = async (id) => {
    try {
      const res = await getreviews(id);
      if (res.status === 200) {
        setReview(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleActionLikeClick = async (data) => {
    if (user) {
      let likedata = {
        productID: id,
        like: true,
        dislike: data?.dislike,
        comment_id: data?._id,
      };
      try {
        const res = await putreviews(likedata);
        if (res.status === 200) {
          console.log(res, "data");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      message.info(
        data?.dislike
          ? "Please log in to dislike this item."
          : "Please log in to like this item."
      );
    }
  };

  const HandelDeleteReview = async (reviewId) => {
    try {
      const res = await Deletereviews({ productID: id, review_id: reviewId });
      if (res.status === 200) {
        setReview((prevReviews) =>
          prevReviews.filter((review) => review?._id !== reviewId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandelAllReview = () => {
    //  router.push({
    //   pathname:"/product/allreview",
    //   query:{id:id},
    //  })
  };
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 my-4">
        Product Review
      </h2>
      <div>
        <List
          itemLayout="vertical"
          size="small"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 4,
          }}
          dataSource={review}
          footer={
            <p
              onClick={HandelAllReview}
              className=" cursor-pointer text-base hover:text-blue-700"
            >
              See All review
            </p>
          }
          renderItem={(data) => (
            <ReviewItem
              data={data}
              user={user}
              handleActionLikeClick={handleActionLikeClick}
              HandelDeleteReview={HandelDeleteReview}
            />
          )}
        />
      </div>
    </div>
  );
}

export default ReviewSection;
