"use client";
import React, { useState } from "react";
import { Button, Input, Upload, message, Image, notification } from "antd";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";
import { getRatingSpan } from "@/utils/client/colourCode";
import { useFormik } from "formik";
import { GiveRatingSchema } from "@/Schemas/client/FormSchema";
import { useUser } from "@/context/authContext";
import { useRouter } from "next/router";
import { useAuthData } from "@/service/Auth";
import { Rating } from "@fluentui/react-rating";
// import Image from "next/image";

const AddReviewPage = ({ ReviewProductId }: { ReviewProductId: string }) => {
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
          productID: ReviewProductId,
          username: user?.name,
          userId: user?._id,
          rating: values?.rating,
          images: values?.image,
          comment: values?.description,
          userImage: "",
        };
        const res = await postreviews(data);
        if (res?.status === 201) {
          setLoading(false);
          message.success(res?.data?.message);
          router.push(`/product/${ReviewProductId}`);
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
    console.log(file, "file");
    if (file?.size >= 3145728) {
      return notification.warning({
        message: "",
        description: "Image size cannot be more than 3 MB.",
      });
    }
    if (imageList?.length >= 5) {
      message.error("You can only upload up to 5 images.");
      return;
    }
    setImageLoading(true);
    const fmData = new FormData();
    fmData.append("file", file);
    try {
      const res = await postImage(fmData);
      if (res?.data?.success) {
        setImageList((prev) => [...prev, res?.data?.imageUrl]);
        formik.setFieldValue("image", [...imageList, res?.data?.imageUrl]);
      } else {
        message.error("Error uploading image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageLoading(false);
    }
  };
  const handleDeleteImage = async (url: string) => {
    try {
      const res = await deleteImage(url);
      if (res?.data?.success) {
        setImageList((prev) => prev.filter((img) => img !== url));
        formik.setFieldValue(
          "image",
          imageList?.filter((img) => img !== url)
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
          Give Your Rating & Review
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 text-black">
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Rate This Product</h2>
            <Rating
              className="text-theme-golden"
              value={formik?.values?.rating}
              onChange={(_, rating) => handleRatingChange(rating?.value)}
            />
            {formik?.values?.rating !== 0 &&
              getRatingSpan(formik?.values?.rating)}
            {formik?.touched?.rating && formik?.errors?.rating ? (
              <div className="text-red-500">{formik?.errors?.rating}</div>
            ) : null}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-4">Write Your Review</h2>
              <form onSubmit={formik?.handleSubmit}>
                <div className="mb-2">
                  <Input.TextArea
                    name="description"
                    placeholder="Write your thoughts..."
                    required
                    rows={4}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    value={formik?.values?.description}
                  />
                  {formik?.touched?.description &&
                  formik?.errors?.description ? (
                    <div className="text-red-500">
                      {formik?.errors?.description}
                    </div>
                  ) : null}
                </div>
                <div className="mb-2">
                  <h2 className="text-xl font-semibold mb-4">
                    Upload an Image
                  </h2>
                </div>
                <div className="mb-2">
                  <Upload
                    customRequest={handleImageUpload}
                    showUploadList={false}
                    disabled={imageloading}
                    accept="image/*"
                  >
                    <Button loading={imageloading} icon={<UploadOutlined />}>
                      {imageloading ? "Uploading..." : "Click to Upload"}
                    </Button>
                  </Upload>
                  {formik?.touched?.image && formik?.errors?.image ? (
                    <div className="text-red-500">{formik?.errors?.image}</div>
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
                            className="absolute top--2 right--2 text-gray-700 cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="bg-theme-red hover:bg-orange-500 border-none"
                  >
                    {loading ? "Submitting..." : "Submit"}
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
