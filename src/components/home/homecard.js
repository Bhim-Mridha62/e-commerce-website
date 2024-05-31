import { useState, useEffect } from "react";
// import Productskeleton from "../common/productskeleton";
import ProductCard from "../common/productcard/productcard";
import { GetAllProduct } from "@/service/Product";
import Loading from "../Loading/Loading";

function Homecard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  const [skip, setSkip] = useState(0);
  const limit = 20;

  async function fetchData() {
    try {
      const response = await GetAllProduct(skip, limit);
      setProducts((prevProducts) => [...prevProducts, ...response.data.data]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error (e.g., display an error message)
    }
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserString = localStorage.getItem("User");
      const storedUser = storedUserString ? JSON.parse(storedUserString) : "";
      setUser(storedUser ? true : false);
    }
  }, []);
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
    <div className="checksixe flex flex-wrap mt-12 min-h-screen justify-center md:gap-12 bg-white Msm:gap-2">
      {loading ? (
        <Loading />
      ) : (
        products.map((product) => (
          <ProductCard key={product._id} product={product} user={user} />
        ))
      )}
    </div>
  );
}

export default Homecard;
