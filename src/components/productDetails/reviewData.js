import { List, Popconfirm, Rate, Space } from "antd";
import React from "react";
import { AiFillDislike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const reviewData = ({ data }) => {
  const [like, setLike] = useState("");
  const { getreviews, putreviews, Deletereviews } = useAuthData();

  const IconText = ({ icon, text, style, onClick }) => (
    <Space className="mr-4" onClick={onClick}>
      {React.createElement(icon, { style: { ...style, cursor: "pointer" } })}
      {text}
    </Space>
  );
  const handleActionLikeClick = async (data) => {
    if (user) {
      if (data?.dislike === true) {
        setLike("dislike");
      } else {
        setLike("like");
      }
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
  const HandelDeleteReview = async (data) => {
    try {
      const res = await Deletereviews({ productID: id, review_id: data });
      if (res.status === 200) {
        console.log(res, "data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <List.Item
      className="p-0"
      key={data._id}
      actions={[
        <IconText
          icon={BiSolidLike}
          text={like === "like" ? data?.like + 1 : data?.like}
          key="list-vertical-like-o"
          style={{
            fontSize: "18px",
            color: like === "like" && "#3c3cff",
          }}
          onClick={() => handleActionLikeClick({ ...data, dislike: false })}
        />,
        <IconText
          icon={AiFillDislike}
          text={like === "dislike" ? data?.dislike + 1 : data?.dislike}
          key="list-vertical-star-o"
          style={{
            fontSize: "18px",
            color: like === "dislike" && "#3c3cff",
          }}
          onClick={() => handleActionLikeClick({ ...data, dislike: true })}
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
              <MdDeleteForever className="inline-flex ml-10 text-red-700" />
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

export default reviewData;
