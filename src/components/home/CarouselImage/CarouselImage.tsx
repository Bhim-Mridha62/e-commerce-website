import React, { useEffect, useState } from "react";
import { message } from "antd";
import "swiper/css";
import "swiper/css/pagination";
import { RightOutlined } from "@ant-design/icons";
import { useAuthData } from "@/service/Auth";
import { ICarousel } from "@/types/types";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Homecarousel = () => {
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
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-50 p-4 border-r">
          <ul>
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
                    <RightOutlined />
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
        <div className="w-3/4 p-4">
          <Swiper modules={[Navigation]}>
            {images.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative w-full h-[300px] overflow-hidden"
                  style={{
                    backgroundImage: `url(${slide.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-8 text-white">
                    <h2 className="text-2xl font-bold">{slide.title||}</h2>
                    <p className="text-lg mt-2">{slide.subtitle}</p>
                    <button className="mt-4 px-4 py-2 bg-white text-black rounded-md">
                      Shop Now →
                    </button>
                  </div> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Homecarousel;
