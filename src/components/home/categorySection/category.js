import React, { useCallback } from "react";
import productsData from "@/data/homePage/homeCategory.json";
import { useRouter } from "next/router";
import Image from "next/image";

// Memoizing the products data to prevent re-renders
const categories = productsData.map((product) => ({
  category: product.category,
  img: product.img,
}));

function Categories() {
  const router = useRouter();

  // Memoized event handler to prevent unnecessary re-renders
  const handleCategory = useCallback(
    (category) => {
      router.push(`/category/${category}`);
    },
    [router]
  );

  return (
    <div className="HideScroll border-y-4 overflow-hidden">
      <div className="flex w-full overflow-x-auto gap-1 lsm:gap-8 HideScroll">
        {categories.map((product, index) => (
          <div
            onClick={() => handleCategory(product.category)}
            key={index}
            className="p-2 rounded-md flex flex-col items-center cursor-pointer"
          >
            <Image
              src={product.img}
              alt={product.category}
              width={96}
              height={96}
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

export default React.memo(Categories);
