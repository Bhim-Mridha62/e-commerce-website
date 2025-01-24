import React, { memo, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useAuthData } from "@/service/Auth";
import { message } from "antd";
import { Icategory } from "@/types/types";
import HomePageSectionHeading from "../homePageSectionHeading";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Link from "next/link";
const Categories = memo(() => {
  const [categories, setCategories] = useState<Icategory[]>([]);
  const { getCategories } = useAuthData();
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response?.data?.data);
    } catch (error) {
      message.error("Error fetching categories");
    }
  };
  if (categories.length === 0) {
    return "";
  }
  return (
    <div className="py-6 md:py-12 w-[90%] mx-auto border-b border-theme-border">
      <div className="relative w-full">
        <div className="md:mb-4 flex justify-between">
          <HomePageSectionHeading
            className=""
            topHeading="Categories"
            bottomHeading="Browse By Category"
          />
          <div className="swiper-navigation-buttons w-24 relative flex">
            <button className="swiper-button-prev-home-category swiper-button-prev bg-gray rounded-full !size-8 md:!size-10 ml-[-10px] bg-theme-border">
              <GoChevronLeft className="text-black !size-6" />
            </button>
            <button className="swiper-button-next-home-category swiper-button-next  bg-gray rounded-full !size-8 md:!size-10 bg-theme-border ">
              <GoChevronRight className="text-black !size-6" />
            </button>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next-home-category",
            prevEl: ".swiper-button-prev-home-category",
          }}
          className="home-page-swiper"
          spaceBetween={16} // Space between slides
          slidesPerView="auto"
        >
          {categories.map((product) => (
            <SwiperSlide key={product?._id} className="custom-slide-categories">
              <div className="flex items-center flex-col">
                <Link href={`/category/${product?.category}`}>
                  <div className="bg-theme-border w-24 md:w-36 h-24 md:h-36 rounded-full">
                    <Image
                      src={product?.image || ""}
                      alt={product?.category || ""}
                      width={1000}
                      height={1000}
                      className="md:w-36 w-24 md:h-36 h-24 mb-2 object-contain mix-blend-multiply rounded-full"
                    />
                  </div>
                  <p>{product?.category}</p>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
});

export default Categories;
