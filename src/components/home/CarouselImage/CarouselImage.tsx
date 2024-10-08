import React, { useEffect, useState } from "react";
import { Carousel, message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useAuthData } from "@/service/Auth";
import { ICarousel } from "@/types/types";

const Homecarousel = () => {
  const [images, setImages] = useState<ICarousel[]>([]);
  const { getcarousel } = useAuthData();
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await getcarousel();
      setImages(response?.data);
    } catch (error) {
      message.error("Error fetching images");
    }
  };
  console.log(images, "img");
  return (
    <div>
      <Carousel
        autoplay
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
      >
        {images?.map((imageUrl, index) => (
          <div key={index}>
            <img
              src={imageUrl?.imageUrl}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Homecarousel;
