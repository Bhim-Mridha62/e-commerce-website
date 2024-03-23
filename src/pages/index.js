import Homecard from "@/components/home/homecard";
import { Inter } from "next/font/google";
import Head from "next/head";
import Categories from "@/components/home/categorySection/category";
import Homecarousel from "@/components/home/CarouselImage/CarouselImage";
import Chance from 'chance';
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const chance = new Chance();

  // Generate random data using Chance.js methods
  const randomName = chance.avatar();
  const randomEmail = chance.email();
    console.log(randomName,"randomName");
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
