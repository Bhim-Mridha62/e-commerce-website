import ProductCard from "@/components/common/productcard/productcard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { category } = router.query;
  console.log("Category:", category);

  const fetchCategoryProduct = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = await response.json();
      setProducts(data.products);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (category) {
      fetchCategoryProduct();
    }
  }, [category]);

  return (
    <div>
      <h1 className="font-bold text-3xl">Related Products of {category}</h1>
      <div className="flex flex-wrap justify-center mt-10 gap px-10 gap-10">
        {products &&
          products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
