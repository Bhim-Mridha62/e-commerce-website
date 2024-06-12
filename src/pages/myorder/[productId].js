import React, { useState } from "react";
import { Rate, Button, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";
import { getRatingSpan } from "@/utils/client/colourCode";
import { useFormik } from "formik";
import { GiveRatingSchema } from "@/Schemas/client/FormSchema";
import axios from "axios";

const AddReviewPage = () => {
  const formik = useFormik({
    initialValues: {
      rating: 0,
      description: "",
      image: null,
    },
    validationSchema: GiveRatingSchema,
    onSubmit: (values) => {
      console.log("Review submitted", values);
    },
  });

  const handleRatingChange = (value) => {
    formik.setFieldValue("rating", value);
  };
  const handleImageUpload = async(e) => {
    const formData = new FormData();
    formData.append('file', e?.target?.files[0]);

    try {
      const response = await axios.post('/api/ImageUpload', formData,{
        headers: { 'Content-Type': 'multipart/form-data' }, // Ensure proper content type
        responseType: 'blob', // Set response type to blob
      });
      // const imageUrl = response.data.match(/<img src="([^"]+)"/);
      const imageUrl = response.headers['location'];
      // const absoluteUrl = window.location.protocol + imageUrl[1];
      console.log(response,"response?.data");
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  // const handleImageUpload = async(e) => {
  //   const formData = new FormData();
  //   formData.append('image', e?.target?.files[0]);
  //   const res = await fetch(`https://api.imgbb.com/1/upload?key=${process?.env?.NEXT_PUBLIC_IMDBB_API_KEY}`, {
  //     method: 'POST',
  //     body: formData,
  //   });
  //   const data = await res.json();
  //   console.log(data?.data?.url);
  // };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="border-b mb-4">
        <h1 className="text-2xl font-semibold mb-4 text-black">Give Ratings & Reviews</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 text-black">
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Rate this product</h2>
            <Rate onChange={handleRatingChange} value={formik.values.rating} /> {formik.values.rating !== 0 && getRatingSpan(formik.values.rating)}
            {formik.touched.rating && formik.errors.rating ? (
              <div className="text-red-500">{formik.errors.rating}</div>
            ) : null}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-4">Review this product</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-2">
                  <Input.TextArea
                    name="description"
                    placeholder="Description..."
                    required
                    rows={4}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-500">{formik.errors.description}</div>
                  ) : null}
                </div>
                <div className="mb-2">
                  <input type="file" onChange={handleImageUpload} accept="image/*"/>test
                  <Upload
                    // beforeUpload={() => false}
                    onChange={handleImageUpload}
                    // maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>Upload Photo</Button>
                  </Upload>
                  {formik.touched.image && formik.errors.image ? (
                    <div className="text-red-500">{formik.errors.image}</div>
                  ) : null}
                </div>
                <div className="mt-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-orange-600 hover:bg-orange-500 border-none"
                  >
                    SUBMIT
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReviewPage;
