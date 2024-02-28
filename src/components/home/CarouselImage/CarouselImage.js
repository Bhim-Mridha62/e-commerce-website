import React from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import CarouselImage from "@/data/homePage/CarouselImageUrlList.json";

const Homecarousel = () => {
  return (
    <div>
    <Carousel autoplay prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />}>
      {CarouselImage.map((imageUrl, index) => (
        <div key={index}>
          <img src={imageUrl} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
        </div>
      ))}
    </Carousel>
    </div>
  );
};

export default Homecarousel;
