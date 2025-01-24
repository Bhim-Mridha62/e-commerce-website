import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthData } from "@/service/Auth";
import { message } from "antd";
import { Icategory } from "@/types/types";
import SEO from "@/components/common/seo";
function index() {
  const [categories, setCategories] = useState<Icategory[]>([]);
  const router = useRouter();
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
  const handleCategory = (category: string) => {
    console.log(category, "category");
    router.push(`/category/${category}`);
  };
  return (
    <>
      <SEO
        title="Categories - SD FASHION SHOP"
        description="Explore a wide range of categories at SD FASHION SHOP."
        url="category"
      />
      <div className="flex flex-wrap w-full  gap-1 lsm:gap-8 mdb:gap-16 ">
        {categories.map((product, index) => (
          <div
            onClick={() => handleCategory(product?.category)}
            key={index}
            className="bg-white shadow-md p-4 rounded-md flex flex-col items-center"
          >
            <img
              src={product?.image}
              alt={product?.category}
              className="w-32 h-32 object-cover mb-2"
            />
            <button className=" text-black px-4 py-2 rounded">
              {product?.category}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default index;
