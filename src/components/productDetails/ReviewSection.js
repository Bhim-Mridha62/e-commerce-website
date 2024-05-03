import { Avatar, List, Rate, Space } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa6";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { TbShare3 } from "react-icons/tb";
function ReviewSection({ reviews }) {
  const [review, setReview] = useState([]);
  const router = useRouter();
  useEffect(() => {
    setReview(reviews)
    // console.log(reviews, "reviews");
    getReviewData();
  }, [reviews]);
  const getReviewData = async () => {
    axios
      .get("https://dummyjson.com/comments")
      .then((res) => {
        setReview(res.data.comments);
      })
      .catch((err) => console.log(err));
  };
  const IconText = ({ icon, text }) => (
    <Space className="mr-4">
      {React.createElement(icon)}
      {text}
    </Space>
  );
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
            // onChange: (page) => {
            //   console.log(page);
            // },
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
              key={data.id}
              actions={[
                <IconText
                  icon={TbShare3}
                  text="156"
                  key="list-vertical-star-o"
                />,
                <IconText
                  icon={BiSolidLike}
                  text="156"
                  key="list-vertical-like-o"
                />,
                <IconText
                  icon={FaCommentDots}
                  text="2"
                  key="list-vertical-message"
                />,
              ]}
            >
              <List.Item.Meta
                style={{ marginBottom: 0 }}
                avatar={
                  <img className="w-7" src="/reviewAvtar.png" alt="avtar" />
                }
                title={
                  <p>
                    {data?.user?.username}{" "}
                    <span className="ml-1 text-xs text-gray-400">20/12/20</span>
                  </p>
                }
                description={
                  <div className="">
                    <Rate className="text-xs" allowHalf disabled value={4.2} />
                    4.2
                  </div>
                }
              />
              {data.body}
            </List.Item>
          )}
        />
      </div>
      {/* <div>
        {review.slice(0, 5).map((data) => (
          <div className=" border-b-2 ">
            <div className="flex">
              <div>
                <Avatar />
              </div>
              <div>
                <p>
                  <span>{data.user.username}</span>
                  <MdOutlineStarPurple500 className="inline" />
                </p>
                <span>22/15/2001</span>
              </div>
            </div>
            <div>{data.body}</div>
            <div>
              <IconText icon={TbShare3} text="156" key="list-vertical-star-o" />
              <IconText
                icon={FaCommentDots}
                text="156"
                key="list-vertical-star-o"
              />
              <IconText
                icon={BiSolidLike}
                text="156"
                key="list-vertical-star-o"
              />
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default ReviewSection;
