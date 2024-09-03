"use client";
import { Avatar, Button, Modal, Spin, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Compress from "compress.js";
import { CameraOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useAuthData } from "@/service/Auth";

const ImageContent = (src: any) => {
  const [crop, setCrop] = React.useState<Crop>({
    unit: "px",
    width: 50,
    aspect: 1,
    x: 25,
    y: 25,
    height: 50,
  });
  const [imgSrc, setImgSrc] = React.useState<any>(null);
  const webcamRef = React.useRef<any>(null);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [camera, setCamera] = React.useState<boolean>(false);
  const [completedCrop, setCompletedCrop] = React.useState<any>({
    unit: "px",
    aspect: 1 / 1,
    width: 100,
    height: 100,
  });
  const imgRef = React.useRef<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [fileMetaData, setFileMetaData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState("");
  const { postImage } = useAuthData();
  const FileName = "66673d93fca33bd03f677b42_Profile_pic";
  useEffect(() => {
    setCrop(crop);
    setImageSrc(
      window.localStorage.getItem("image") !== null
        ? window.localStorage.getItem("image") + "?" + new Date().getTime()
        : ""
    );
  }, [loading, crop]);

  function handleChange(e: any) {
    const reader = new FileReader();
    reader.onload = () => {};
    if (e?.target?.files) {
      setFileMetaData(e?.target?.files[0]);
      setImgSrc(URL.createObjectURL(e?.target?.files[0]));
    } else {
      notification.error({
        message: "error_occurs.Upload_File_Format",
      });
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (e: any) => {
    OnUploadImage(e);
    retake();
    setCamera(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    capture();
    setCamera(false);
    setIsModalOpen(false);
    retake();
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const onImageLoad = React.useCallback((img: any) => {
    imgRef.current = img;
  }, []);

  const onCropComplete = async () => {
    let croppedimg: any = await getCroppedImage().then((res) => res);
    return fetch(croppedimg?.imageData64)
      .then((response) => response.blob())
      .then((blob) => {
        let profilepic = FileName;
        const file = new File([blob], profilepic, { type: "image/jpeg" });
        return file;
      })
      .catch((error) => {
        console.error("Error fetching blob:", error);
      });
  };

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw circular clipping path
    ctx.beginPath();
    ctx.arc(
      crop.width * scaleX * 0.5,
      crop.height * scaleY * 0.5,
      Math.min(crop.width * scaleX, crop.height * scaleY) * 0.5,
      0,
      2 * Math.PI
    );
    ctx.closePath();
    ctx.clip();

    // Draw cropped image
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  //Get cropped image
  const getCroppedImage = () => {
    const canvas = previewCanvasRef.current;
    return new Promise((resolve) => {
      const imageData64 = canvas?.toDataURL("image/jpg");
      const myFilename =
        fileMetaData?.name?.split(".").slice(0, -1).join(".") +
        "." +
        fileMetaData?.fileType;
      let data = {
        imageData64,
        myFilename,
      };
      resolve(data);
    });
  };

  async function resizeImageFn(file: any) {
    let fileData: any;
    return fetch(file)
      .then((response) => response.blob())
      .then(async (blob) => {
        let profilepic = FileName;
        fileData = new File([blob], profilepic, { type: blob?.type });
        const compress = new Compress();
        const resizedImage = await compress?.compress([fileData], {
          size: 2, // the max size in MB, defaults to 2MB
          quality: 1, // the quality of the image, max is 1,
          maxWidth: 300, // the max width of the output image, defaults to 1920px
          maxHeight: 300, // the max height of the output image, defaults to 1920px
          resize: true, // defaults to true, set false if you do not want to resize the image width and height
        });
        const img = resizedImage[0];
        const base64str = img.data;
        const imgExt = img.ext;
        const resizedFiile: any = Compress.convertBase64ToFile(
          base64str,
          imgExt
        );
        resizedFiile.name = fileData.name;
        return resizedFiile;
      })
      .catch((error) => {
        console.error("Error fetching blob:", error);
      });
  }

  async function OnUploadImage(_: any) {
    try {
      setLoading(true);
      const imgs: any = await onCropComplete();
      const resizedFile =
        imgs?.size > 2 * 1024 * 1024
          ? await resizeImageFn(URL.createObjectURL(imgs))
          : imgs;
      let file = new FormData();
      file.append("file", resizedFile);
      console.log(file, resizedFile, "resizedFile");
      const res = await postImage(file);
      if (res?.data?.success) {
        console.log(res?.data?.imageUrl, "imageUrl");
        handleCancel();
        notification.success({ message: "Image Uploaded Successfully" });
      } else {
        notification.error({
          message: "Image Uploading Fail. Please try again later",
        });
      }
    } catch (error) {
      notification.error({
        message: "Image Uploading Fail. Please try again later",
      });

      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="md:mx-2 relative flex justify-center">
        {/* <Avatar size={105}  > */}
        <div className="profile-Editimage">
          {imageSrc ? (
            <Image
              width={110}
              loading="lazy"
              // priority
              className="rounded-full"
              height={110}
              src={imageSrc ? imageSrc : "/images/dummyUser.png"}
              alt={"profile Image "}
              // loader={({ src }) => `${src}`}
            />
          ) : (
            <Avatar size={96} icon={<UserOutlined />} />
          )}
          <div>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              className="absolute text-black Msm:bottom-0 sm:bottom-0 lsm:bottom-2  transform translate-x-1/2 bg-white border-2 border-gray-300"
              style={{ padding: "4px" }}
              onClick={showModal}
            />
          </div>
        </div>
      </div>
      <Modal
        title="Profile Image"
        open={isModalOpen}
        onOk={handleOk}
        maskClosable={false}
        onCancel={handleCancel}
        footer={[
          <Button hidden={!imgSrc} key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <button
            className="rounded-lg p-1 px-3 mx-2 border-dashed border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            hidden={!imgSrc}
            key="upload"
            onClick={OnUploadImage}
          >
            Upload
          </button>,
        ]}
      >
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin size="large" />
            <p>Uploading</p>
          </div>
        )}
        <div hidden={loading}>
          {!imgSrc && !camera && (
            <div className="md:flex justify-between w-full">
              <div className="flex items-center justify-center w-full m-2">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-black border-dashed rounded-lg cursor-pointer bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <IoCloudUploadOutline className="text-3xl" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG JPG or JPEG Only
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    onChange={handleChange}
                    accept="image/jpeg, image/png, image/jpg"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex items-center justify-center w-full m-2">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-black border-dashed rounded-lg cursor-pointer bg-gray-50 ">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <CameraOutlined className="text-2xl" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Open Camera</span>
                    </p>
                    {/* <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
                  </div>
                  <button onClick={() => setCamera(true)}></button>
                  {/* <input id="dropzone-file" onChange={handleChange} type="file" className="hidden" /> */}
                </label>
              </div>
            </div>
          )}
          <div className="container">
            {camera && !imgSrc && (
              <Webcam height={600} width={600} ref={webcamRef} />
            )}
          </div>
          <div className="md:flex justify-between">
            <div className="md:w-1/2 md:mx-4 sm:my-4" hidden={!imgSrc}>
              <canvas
                className="h-[80%]"
                ref={previewCanvasRef}
                style={{
                  width: "100%",
                }}
              />
            </div>
            <div className="md:w-3/4">
              <div
                className="rounded-md"
                hidden={!imgSrc}
                style={{ maxHeight: "300px", overflow: "auto" }}
              >
                <ReactCrop
                  style={{
                    height: "100%",
                    width: "100%",
                    maxWidth: "auto",
                  }}
                  onImageLoaded={onImageLoad}
                  src={imgSrc}
                  className="mainphoto-crop"
                  crop={crop}
                  onComplete={(c) => setCompletedCrop(c)}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                ></ReactCrop>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {camera &&
              (imgSrc ? (
                <Button onClick={retake}>Delete</Button>
              ) : (
                <Button onClick={capture}>Click</Button>
              ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImageContent;
