import { Card, Rate, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import { useState, useEffect } from "react";
import Productskeleton from "../common/productskeleton";
import { calculateDiscountedPrice } from "@/utils/client/discountUtils";
import { useRouter } from "next/router";
import ProductCard from "../common/productcard/productcard";
import { GetAllProduct } from "@/service/Product";
function Homecard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  async function fetchData() {
    try {
      const response = await GetAllProduct();
      console.log(response,"response");
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
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}

export default Homecard;
