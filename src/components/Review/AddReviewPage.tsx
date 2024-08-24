"use client";
import React, { useState } from "react";
import { Rate, Button, Input, Upload, message, Image } from "antd";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";
import { getRatingSpan } from "@/utils/client/colourCode";
import { useFormik } from "formik";
import { GiveRatingSchema } from "@/Schemas/client/FormSchema";
import { useUser } from "@/context/authContext";
import { useRouter } from "next/router";
import { useAuthData } from "@/service/Auth";
// import Image from "next/image";

const AddReviewPage = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageloading, setImageLoading] = useState<boolean>(false);
  const [imageList, setImageList] = useState<string[]>([]);
  const router = useRouter();
  const { postreviews, postImage, deleteImage } = useAuthData();
  const formik = useFormik({
    initialValues: {
      rating: 0,
      description: "",
      image: imageList,
    },
    validationSchema: GiveRatingSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        let data = {
          productID: router?.query?.productId,
          username: user?.name,
          userId: user?._id,
          rating: values?.rating,
          images: values?.image,
          comment: values?.description,
          userImage: "",
        };
        const res: any = await postreviews(data);
        if (res.status === 201) {
          setLoading(false);
          message.success(res?.data?.message);
          router.push(`/product/${router?.query?.productId}`);
        } else {
          setLoading(false);
          message.error("Something wrong Please Try again");
        }
      } catch (error) {
        message.error("Something wrong Please Try again");
        setLoading(false);
      }
    },
  });

  const handleRatingChange = (value: number) => {
    formik.setFieldValue("rating", value);
  };
  const handleImageUpload = async ({ file }: any) => {
    if (imageList.length >= 5) {
      message.error("You can only upload up to 5 images.");
      return;
    }
    setImageLoading(true);
    const fmData = new FormData();
    fmData.append("file", file);
    try {
      const res: any = await postImage(fmData);
      if (res.data.success) {
        setImageList((prev) => [...prev, res.data.imageUrl]);
        formik.setFieldValue("image", [...imageList, res.data.imageUrl]);
      } else {
        message.error("Error uploading image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageLoading(false);
    }
  };
  const handleDeleteImage = async (url: any) => {
    try {
      const res: any = await deleteImage(url);
      if (res.data.success) {
        setImageList((prev) => prev.filter((img) => img !== url));
        formik.setFieldValue(
          "image",
          imageList.filter((img) => img !== url)
        );
        message.success("Image deleted successfully");
      } else {
        message.error("Error deleting image");
      }
    } catch (error) {
      message.error("Error deleting image");
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="border-b mb-4">
        <h1 className="text-2xl font-semibold mb-4 text-black">
          Give Ratings & Reviews
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 text-black">
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Rate this product</h2>
            <Rate
              onChange={handleRatingChange}
              value={formik.values.rating}
            />{" "}
            {formik.values.rating !== 0 && getRatingSpan(formik.values.rating)}
            {formik.touched.rating && formik.errors.rating ? (
              <div className="text-red-500">{formik.errors.rating}</div>
            ) : null}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-4">
                Review this product
              </h2>
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
                    <div className="text-red-500">
                      {formik.errors.description}
                    </div>
                  ) : null}
                </div>
                <div className="mb-2">
                  <Upload
                    customRequest={handleImageUpload}
                    showUploadList={false}
                    disabled={imageloading}
                  >
                    <Button loading={imageloading} icon={<UploadOutlined />}>
                      {imageloading ? "Uploading..." : "Upload Photo"}
                    </Button>
                  </Upload>
                  {formik.touched.image && formik.errors.image ? (
                    <div className="text-red-500">{formik.errors.image}</div>
                  ) : null}
                </div>
                <div className="mt-4">
                  {imageList.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                      {imageList.map((imageUrl) => (
                        <div key={imageUrl} className="relative">
                          <Image
                            width={100}
                            src={imageUrl}
                            alt="Uploaded image"
                            preview={false}
                            className="rounded-lg"
                          />
                          <CloseCircleOutlined
                            onClick={() => handleDeleteImage(imageUrl)}
                            className="absolute top-1 right-1 text-red-500 cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="bg-orange-600 hover:bg-orange-500 border-none"
                  >
                    {loading ? "Please wait" : "SUBMIT"}
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
