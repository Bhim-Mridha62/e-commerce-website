import { useState, useEffect } from "react";
// import Productskeleton from "../common/productskeleton";
import ProductCard from "../common/productcard/productcard";
import Loading from "../Loading/Loading";
import { useUser } from "@/context/authContext";
import { useAuthData } from "@/service/Auth";

function Homecard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { GetAllProduct } = useAuthData();
  const { user } = useUser();
  const [skip, setSkip] = useState(0);
  const limit = 20;

  async function fetchData() {
    try {
      const response = await GetAllProduct(skip, limit);
      if (response?.status == 200) {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...response?.data?.data,
        ]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      // Handle the error (e.g., display an error message)
    }
  }
  useEffect(() => {
    fetchData(); // Initial data fetch

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setSkip((prevSkip) => prevSkip + limit);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [skip]);

  return (
    <div>
      {loading ? (
        <Loading className="my-8" />
      ) : (
        <div className="mt-12 checksixe flex flex-wrap min-h-screen justify-center md:gap-12 bg-white Msm:gap-2">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Homecard;
