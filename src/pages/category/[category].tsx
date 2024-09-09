import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamic import for ProductCard to enable lazy loading
const ProductCard = dynamic(
  () => import("@/components/common/productcard/productcard")
);

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { category } = router.query;

  const fetchCategoryProduct = useCallback(async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    if (category) {
      fetchCategoryProduct();
    }
  }, [category, fetchCategoryProduct]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="font-bold text-3xl">Related Products of {category}</h1>
      <div className="flex flex-wrap justify-center mt-10 gap px-10 gap-10">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
