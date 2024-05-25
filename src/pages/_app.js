import Layout from "@/components/Layout";
import "@/styles/globals.css";
import axios from "axios";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api");
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
