import React from 'react';
import productsData from '@/data/homePage/homeCategory.json';
import { useRouter } from 'next/router';

function Categories() {
    const router=useRouter();
    const handleCategory = (category) => {
        console.log(category, "category");
        router.push(`/category/${category}`);
    }
  return (
    <div className="overflow-hidden">
      <div className="flex w-full overflow-x-auto gap-1 lsm:gap-8 mdb:gap-16 ">
        {productsData.map((product, index) => (
          <div onClick={()=>handleCategory(product.category)} key={index} className="bg-white shadow-md p-4 rounded-md flex flex-col items-center">
            <img src={product.img} alt={product.category} className="w-32 h-32 object-cover mb-2" />
            <button className=" text-black px-4 py-2 rounded">{product.category}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
