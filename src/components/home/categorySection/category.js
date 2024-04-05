import React from "react";
import productsData from "@/data/homePage/homeCategory.json";
import { useRouter } from "next/router";

function Categories() {
  const router = useRouter();
  const handleCategory = (category) => {
    router.push(`/category/${category}`);
  };
  return (
    <div className=" HideScroll overflow-hidden hide-scrollbar">
      <div className=" HideScroll flex w-full overflow-x-auto gap-1 lsm:gap-8 ">
        {productsData.map((product, index) => (
          <div
            onClick={() => handleCategory(product.category)}
            key={index}
            className=" p-4 rounded-md flex flex-col items-center cursor-pointer"
          >
            <img
              src={product.img}
              alt={product.category}
              className="w-24 h-24 object-cover mb-2"
            />
            <button className="text-black px-4 py-2 rounded">
              {product.category}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
