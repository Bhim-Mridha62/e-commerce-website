import { useUser } from "@/context/authContext";
import { useAuthData } from "@/service/Auth";
import { getLetterColors } from "@/utils/client/colourCode";
import { formatDate } from "@/utils/client/formatDate";
import { Button, List, Popconfirm, Rate, Space } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillDislike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
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
  const IconText = ({ icon, text, style, onClick }) => (
    <Space className="mr-4" onClick={onClick}>
      {React.createElement(icon, { style: { ...style, cursor: "pointer" } })}
      {text}
    </Space>
  );
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
            <List.Item
              className="p-0"
              key={data._id}
              actions={[
                <IconText
                  icon={BiSolidLike}
                  text={data?.like}
                  key="list-vertical-like-o"
                  style={{ fontSize: "18px" }}
                  onClick={() =>
                    handleActionLikeClick({ ...data, dislike: false })
                  }
                />,
                <IconText
                  icon={AiFillDislike}
                  text={data?.dislike}
                  key="list-vertical-star-o"
                  style={{ fontSize: "18px" }}
                  onClick={() =>
                    handleActionLikeClick({ ...data, dislike: true })
                  }
                />,
              ]}
            >
              <List.Item.Meta
                style={{ marginBottom: 0 }}
                avatar={
                  data?.userImage ? (
                    <img
                      className="w-9 h-9 text-center rounded-full"
                      src={data?.userImage}
                      alt="avatar"
                      onError={(e) => {
                        e.target.src = "/user.png";
                      }}
                    />
                  ) : (
                    <p
                      style={{
                        backgroundColor: getLetterColors(
                          data?.username?.charAt(0)
                        ).backgroundColor,
                        color: getLetterColors(data?.username?.charAt(0))
                          .textColor,
                      }}
                      className={`w-8 h-8 pt-[4px] text-center rounded-full`}
                    >
                      {data?.username?.charAt(0)}
                    </p>
                  )
                }
                title={
                  <p>
                    {data?.username}{" "}
                    <span className="ml-1 text-sm text-gray-400">
                      {formatDate(data?.postdAt)}
                    </span>
                    <Popconfirm
                      title="Confirm"
                      description="Delete Review?"
                      okText="Yes"
                      cancelText="No"
                      okButtonProps={{
                        style: { backgroundColor: "red", color: "white" },
                      }}
                      onConfirm={() => HandelDeleteReview(data?._id)}
                    >
                      {user?._id === data?.userId && (
                        <MdDeleteForever className="inline-flex ml-10 text-red-700" />
                      )}
                    </Popconfirm>
                  </p>
                }
                description={
                  <div className="">
                    <Rate
                      className="text-sm"
                      allowHalf
                      disabled
                      value={data?.rating}
                    />
                    <span className="ml-2">{data?.rating}</span>
                  </div>
                }
              />
              {data?.comment}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default ReviewSection;
