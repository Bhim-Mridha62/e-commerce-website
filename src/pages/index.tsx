import dynamic from "next/dynamic";
// import { Inter } from "next/font/google";
import Head from "next/head";
const Categories = dynamic(
  () => import("@/components/home/categorySection/category")
);
const Homecarousel = dynamic(
  () => import("@/components/home/CarouselImage/CarouselImage")
);
const Homecard = dynamic(() => import("@/components/home/homecard"));
// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>mkgzest</title>
      </Head>
      <div className="px-1 msm:px-10">
        a fol apple
        <Categories />
        <Homecarousel />
        <Homecard />
      </div>
    </>
  );
}
