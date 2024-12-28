import React, { memo, useEffect, useState } from "react";
import { message } from "antd";
import "swiper/css";
import "swiper/css/pagination";
import { RightOutlined } from "@ant-design/icons";
import { useAuthData } from "@/service/Auth";
import { ICarousel } from "@/types/types";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";

const Homecarousel = memo(() => {
  const [images, setImages] = useState<ICarousel[]>([]);
  const { getcarousel } = useAuthData();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null);

  const handleMouseEnter = (categoryName: string) => {
    setOpenCategory(categoryName);
    setOpenSubcategory(null); // Reset subcategory on hover over a new category
  };

  const handleMouseLeave = () => {
    setOpenCategory(null);
    setOpenSubcategory(null);
  };

  const handleSubcategoryMouseEnter = (subcategoryName: string) => {
    setOpenSubcategory(subcategoryName);
  };

  const categories = [
    {
      name: "Women's Fashion",
      subcategories: [
        { name: "Tops & Tees" },
        { name: "Dresses" },
        { name: "Pants & Skirts" },
        {
          name: "Shoes",
          subcategories: ["Heels", "Flats", "Boots"],
        },
        {
          name: "Accessories",
          subcategories: ["Bags", "Jewelry", "Scarves"],
        },
      ],
    },
    {
      name: "Men's Fashion",
      subcategories: [
        { name: "Shirts" },
        { name: "Trousers" },
        { name: "Jeans" },
        {
          name: "Shoes",
          subcategories: ["Formal Shoes", "Sneakers", "Sandals"],
        },
        {
          name: "Watches",
          subcategories: ["Smartwatches", "Casual", "Luxury"],
        },
      ],
    },
    {
      name: "Mobile",
      subcategories: [
        {
          name: "Smartphones",
          subcategories: ["Android Phones", "iPhones", "Feature Phones"],
        },
        {
          name: "Accessories",
          subcategories: ["Cases", "Chargers", "Headphones", "Power Banks"],
        },
        {
          name: "Wearables",
          subcategories: ["Smartwatches", "Fitness Bands", "VR Headsets"],
        },
      ],
    },
    {
      name: "Electronics",
      subcategories: [
        {
          name: "Laptops",
          subcategories: ["Gaming Laptops", "Ultrabooks", "Business Laptops"],
        },
        {
          name: "Televisions",
          subcategories: ["LED TVs", "Smart TVs", "4K TVs"],
        },
        {
          name: "Cameras",
          subcategories: [
            "DSLRs",
            "Mirrorless Cameras",
            "Point & Shoot Cameras",
          ],
        },
      ],
    },
  ];

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
      <div className="flex md:flex-row flex-col">
        {/* Sidebar */}
        <div className="md:w-1/4 bg-gray-50 p-4 border-r hidden md:block">
          <ul className="flex md:block">
            {categories.map((category) => (
              <li
                key={category.name}
                className="relative flex justify-between items-center py-2 px-3 hover:bg-gray-100 cursor-pointer"
                onMouseEnter={() => handleMouseEnter(category.name)}
                onMouseLeave={handleMouseLeave}
              >
                <span>{category.name}</span>
                {category?.subcategories && (
                  <>
                    <RightOutlined className="rotate-90 md:rotate-0 ml-1 md:ml-0" />
                    {openCategory === category.name && (
                      <div className="absolute top-0 left-full bg-gray-50 border z-10 p-4 w-60 shadow-lg">
                        <ul>
                          {category?.subcategories?.map(
                            (subcategory, index) => (
                              <li
                                key={index}
                                className="relative py-2 px-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                                onMouseEnter={() =>
                                  handleSubcategoryMouseEnter(subcategory?.name)
                                }
                              >
                                <span>{subcategory?.name}</span>
                                {subcategory?.subcategories && (
                                  <RightOutlined />
                                )}
                                {/* Subcategories inside Subcategory */}
                                {openSubcategory === subcategory?.name &&
                                  subcategory?.subcategories && (
                                    <div className="absolute top-0 left-full bg-gray-50 border z-20 p-4 w-60 shadow-lg">
                                      <ul>
                                        {subcategory?.subcategories.map(
                                          (subSubcategory, index) => (
                                            <li
                                              key={index}
                                              className="py-2 px-3 hover:bg-gray-100 cursor-pointer"
                                            >
                                              {subSubcategory}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  )}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Banner Section */}
        <div className="md:w-3/4 p-4">
          <Swiper
            modules={[Navigation, Pagination]}
            loop
            navigation
            pagination={{ clickable: true }}
          >
            {images.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="bg-theme-black flex flex-row text-theme-white p-1 md:p-4 h-40 md:h-72">
                  <div className="flex flex-col gap-2 md:gap-5 md:flex-1">
                    <h2 className="text-[18px] md:text-2xl font-bold">
                      {slide.title}
                    </h2>
                    <p className="text-xs md:text-lg md:mt-2">
                      {slide.description}
                    </p>
                    <Link href={"/"} className="shop-now-buttom-banner">
                      Shop Now <span>→</span>
                    </Link>
                  </div>
                  <div className="md:flex-1 flex justify-center items-center relative image-with-reflection w-[60%] md:w-full">
                    <Image
                      src={slide.imageUrl}
                      alt="Limited Time Offer"
                      width={1000}
                      height={1000}
                      className="mdb:h-40 w-auto mb-auto"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
});

export default Homecarousel;
