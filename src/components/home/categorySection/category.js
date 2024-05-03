import React from "react";
import productsData from "@/data/homePage/homeCategory.json";
import { useRouter } from "next/router";
import Link from "next/link";

function Categories() {
  const router = useRouter();
  const handleCategory = (category) => {
    router.push(`/category/${category}`);
  };
  return (
    <div className=" HideScroll overflow-hidden hide-scrollbar border-y-4">
      <div className=" HideScroll flex w-full overflow-x-auto gap-1 lsm:gap-8">
        {/* <Link href="/" className="absolute right-2 text-black bg-gray-400 rounded px-1">See All -&gt;</Link> */}
        {productsData.map((product, index) => (
          <div
            onClick={() => handleCategory(product.category)}
            key={index}
            className=" p-2 rounded-md flex flex-col items-center cursor-pointer"
          >
            <img
              src={product.img}
              alt={product.category}
              className="w-24 h-24 object-cover mb-2"
            />
            <button className="text-black whitespace-nowrap py-2 rounded">
              {product.category}
            </button>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default Categories;
