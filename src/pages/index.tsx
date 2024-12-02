import FeaturesSection from "@/components/common/featuresSection";
import LimitedEdition from "@/components/home/limitedEdition";
import NewArrival from "@/components/home/newArrival";
import ToDayFlashSales from "@/components/home/toDayFlashSales";
import dynamic from "next/dynamic";
// import { Inter } from "next/font/google";
import Head from "next/head";
const Categories = dynamic(
  () => import("@/components/home/categorySection/category"),
  {
    ssr: false,
  }
);
// const Homecarousel = dynamic(
//   () => import("@/components/home/CarouselImage/CarouselImage")
// );
// const Homecard = dynamic(() => import("@/components/home/homecard"), {
//   ssr: false,
// });
// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>mkgzest</title>
      </Head>
      <div className="">
        {/* <Homecarousel /> */}
        <ToDayFlashSales topHeading="Today's" bottomHeading="Flash Sales" />
        <Categories />
        {/* <Homecard /> */}
        <LimitedEdition />
        <ToDayFlashSales
          topHeading="This Month"
          isBestSelling={true}
          bottomHeading="Best Selling Products"
        />
        <NewArrival />
        <FeaturesSection />
      </div>
    </>
  );
}
