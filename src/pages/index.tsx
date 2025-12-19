import FeaturesSection from "@/components/common/featuresSection";
import SEO from "@/components/common/seo";
import LimitedEdition from "@/components/home/limitedEdition";
import NewArrival from "@/components/home/newArrival";
import ToDayFlashSales from "@/components/home/toDayFlashSales";
import dynamic from "next/dynamic";
import GoogleAd from "../components/common/GoogleAd";
// import { Inter } from "next/font/google";
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
      <SEO description="Discover the latest fashion trends and shop at SD FASHION SHOP." />
      <div className="">
        {/* <Homecarousel /> */}
        <ToDayFlashSales topHeading="Today's" bottomHeading="Flash Sales" />
        <Categories />
        <GoogleAd slot="8498475458" />
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
