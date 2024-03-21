import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Productskeleton from "../common/productskeleton";
import ProductCard from "../common/productcard/productcard";
function RelatedProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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
    <div className="">
      <div className="flex gap-3 overflow-x-auto w-max">
        {loading ? (
          <Productskeleton />
        ) : (
          products
            ?.slice(0, 10)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto w-max">
        {loading ? (
          <Productskeleton />
        ) : (
          products
            ?.slice(10, 20)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto w-max">
        {loading ? (
          <Productskeleton />
        ) : (
          products
            ?.slice(20, 30)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto w-max">
        {loading ? (
          <Productskeleton />
        ) : (
          products
            ?.slice(0, 10)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        )}
      </div>
    </div>
  );
}

export default RelatedProduct;
