import { Card, Rate, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import { useState, useEffect } from "react";
import Productskeleton from "../common/productskeleton";
import { calculateDiscountedPrice } from "@/utils/discountUtils";
import { useRouter } from "next/router";
import ProductCard from "../common/productcard/productcard";
function Homecard() {
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
  const Productdetails = (id) => {
    console.log(id, "id");
    router.push(`/${id}`);
  };
  return (
    <div className="flex flex-wrap min-h-screen justify-center md:gap-12 bg-white Msm:gap-2">
      {loading ? (
        <Productskeleton />
      ) : (
        products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))
      )}
    </div>
  );
}

export default Homecard;
