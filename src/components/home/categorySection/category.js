import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAuthData } from "@/service/Auth";
import { message } from "antd";
function Categories() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { getCategories } = useAuthData();
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data.data);
    } catch (error) {
      message.error("Error fetching categories");
    }
  };
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
              src={product.image}
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
