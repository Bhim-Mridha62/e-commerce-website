import Homecard from "@/components/home/homecard";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Badge } from "antd";
import Categories from "@/components/home/categorySection/category";
import Homecarousel from "@/components/home/CarouselImage/CarouselImage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
<>
<Head><title>Esey shop</title></Head>
<div className="px-10">
    <Categories/>
    <Homecarousel/>
    <Homecard/>
</div>
</>
  )
}
