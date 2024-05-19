import React, { useState } from "react";
import { Rate, Button, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";
import { getRatingSpan } from "@/utils/client/colourCode";

const AddReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = () => {
    if (description.trim() === "") {
      alert("Description cannot be empty");
      return;
    }
    // Handle the submit logic here
    console.log("Review submitted", { rating, description, title });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="border-b mb-4">
        <h1 className="text-2xl font-semibold mb-4 text-black">Give Ratings & Reviews</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 text-black">
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Rate this product</h2>
            <Rate onChange={handleRatingChange} value={rating} /> {rating !=0 && getRatingSpan(rating)}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-4">
                Review this product
              </h2>
              <Input.TextArea
                placeholder="Description..."
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
                className="mb-2"
              />
              {description.trim() === "" && (
                <p className="text-red-500 mb-2">Description cannot be empty</p>
              )}
              <Upload>
                <Button icon={<UploadOutlined />}>Upload Photo</Button>
              </Upload>
              <div className="mt-4">
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  className="bg-orange-600 hover:bg-orange-500 border-none"
                >
                  SUBMIT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReviewPage;
