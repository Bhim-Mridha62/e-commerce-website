import { Avatar, List, Rate, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa6";
import { TbShare3 } from "react-icons/tb";
function ReviewSection() {
  const [review, setReview] = useState([]);
  useEffect(() => {
    getReviewData();
  }, []);
  const getReviewData = async () => {
    axios
      .get("https://dummyjson.com/comments")
      .then((res) => {
        setReview(res.data.comments);
      })
      .catch((err) => console.log(err));
  };
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  console.log(review, "revire");
  return (
    <div>
      <h2 className="text-3xl p-6 font-bold text-gray-800 mb-6">
        <div>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={review}
            footer={
              <div>
                <b>ant design</b> footer part
              </div>
            }
            renderItem={(data) => (
              <List.Item
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
                  avatar={
                    <img className="w-7" src="/reviewAvtar.png" alt="avtar" />
                  }
                  title={data.user.username}
                  description={
                    <div className="mb-4">
                      <Rate allowHalf disabled value={4.2} />
                      4.2
                    </div>
                  }
                />
                {data.body}
                {data.body}
                {data.body}
                {data.body}
                {data.body}
                {data.body}
                {data.body}
              </List.Item>
            )}
          />
        </div>
      </h2>
    </div>
  );
}

export default ReviewSection;
