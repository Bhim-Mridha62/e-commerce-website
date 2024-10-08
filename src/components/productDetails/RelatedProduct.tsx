import React, { useEffect, useState } from "react";
import Productskeleton from "../common/productskeleton";
import ProductCard from "../common/productcard/productcard";
import { Product } from "@/types/types";
function RelatedProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  async function fetchData() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="text-black mt-4 border-t-[1px] border-[#80808069]">
      <div className="text-xl flex justify-between p-4 font-semibold">
        <div>Reateted product</div>
        <div className="underline underline-offset-2 hover:text-blue-600 cursor-pointer">
          See More
        </div>
      </div>
      <div className="HideScroll flex gap-8 overflow-auto w-[98vw] pl-3">
        {loading ? (
          <Productskeleton />
        ) : (
          products
            ?.slice(0, 10)
            .map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))
        )}
      </div>
      <div className="text-xl flex justify-between p-4 font-semibold">
        <div>Reateted product</div>
        <div className="underline underline-offset-2 hover:text-blue-600 cursor-pointer">
          See More
        </div>
      </div>

      <div className="HideScroll flex gap-8 overflow-auto w-[98vw] pl-3">
        {loading ? (
          <Productskeleton />
        ) : (
          products
            ?.slice(10, 20)
            .map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
        )}
      </div>
      <div className="text-xl flex justify-between p-4 font-semibold">
        <div>Reateted product</div>
        <div className="underline underline-offset-2 hover:text-blue-600 cursor-pointer">
          See More
        </div>
      </div>

      <div className="HideScroll flex gap-8 overflow-auto w-[98vw] pl-3">
        {loading ? (
          <Productskeleton />
        ) : (
          products
            ?.slice(10, 20)
            .map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))
        )}
      </div>
    </div>
  );
}

export default RelatedProduct;
