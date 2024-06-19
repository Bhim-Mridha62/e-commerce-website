import React, { useEffect, useState } from "react";
import { Carousel, message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import CarouselImage from "@/data/homePage/CarouselImageUrlList.json";
import { useAuthData } from "@/service/Auth";

const Homecarousel = () => {
  const [images, setImages] = useState([]);
  const { getcarousel } = useAuthData();
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await getcarousel();
      setImages(response.data.data);
    } catch (error) {
      message.error("Error fetching images");
    }
  };
  return (
    <div>
      <Carousel
        autoplay
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
      >
        {CarouselImage.map((imageUrl, index) => (
          <div key={index}>
            <img
              src={imageUrl}
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
