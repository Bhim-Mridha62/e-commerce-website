import { useAuthData } from "@/service/Auth";
import { formatDate } from "@/utils/client/formatDate";
import { List, Rate, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillDislike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
function ReviewSection({ id }) {
  const [review, setReview] = useState([]);
  const { getreviews } = useAuthData();
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
        setReview(res?.data?.data?.reviews);
      }
    } catch (error) {
      console.log(error);
    }
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
                />,
                <IconText
                  icon={AiFillDislike}
                  text={data?.dislike}
                  key="list-vertical-star-o"
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
                    {data?.username}{" "}
                    <span className="ml-1 text-sm text-gray-400">
                      {formatDate(data?.postdAt)}
                    </span>
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
