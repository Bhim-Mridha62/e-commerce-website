// ReviewItem.js
import { getLetterColors } from "@/utils/client/colourCode";
import { formatDate } from "@/utils/client/formatDate";
import { List, Popconfirm, Rate, Space } from "antd";
import { AiFillDislike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import React, { useState } from "react";

const IconText = ({ icon, text, style, onClick }) => (
  <Space className="mr-4" onClick={onClick}>
    {React.createElement(icon, { style: { ...style, cursor: "pointer" } })}
    {text}
  </Space>
);

const ReviewItem = ({
  data,
  user,
  handleActionLikeClick,
  HandelDeleteReview,
}) => {
  const [like, setlike] = useState("");
  return (
    <List.Item
      className="p-0"
      key={data._id}
      actions={[
        <IconText
          icon={BiSolidLike}
          text={like == "like" ? data?.like + 1 : data?.like}
          key="list-vertical-like-o"
          style={{ fontSize: "18px", color: like == "like" && "blue" }}
          onClick={() =>
            handleActionLikeClick(
              { ...data, dislike: false },
              setlike(user ? "like" : "")
            )
          }
        />,
        <IconText
          icon={AiFillDislike}
          text={like === "dislike" ? data?.dislike + 1 : data?.dislike}
          key="list-vertical-star-o"
          style={{ fontSize: "18px", color: like === "dislike" && "blue" }}
          onClick={() =>
            handleActionLikeClick(
              { ...data, dislike: true },
              setlike(user ? "dislike" : "")
            )
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
                backgroundColor: getLetterColors(data?.username?.charAt(0))
                  .backgroundColor,
                color: getLetterColors(data?.username?.charAt(0)).textColor,
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
                <MdDeleteForever className="inline-flex ml-10 cursor-pointer text-red-700" />
              )}
            </Popconfirm>
          </p>
        }
        description={
          <div className="">
            <Rate className="text-sm" allowHalf disabled value={data?.rating} />
            <span className="ml-2">{data?.rating}</span>
          </div>
        }
      />
      {data?.comment}
    </List.Item>
  );
};

export default ReviewItem;
