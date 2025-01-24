import React from "react";
import ProductDetail from "@/components/productDetails/ProductDetails";
// import ReviewSection from "@/components/productDetails/ReviewSection";
import RelatedProduct from "@/components/productDetails/RelatedProduct";
import SEO from "@/components/common/seo";
import { useRouter } from "next/router";
const Index = () => {
  const router = useRouter();
  const { productId } = router.query;

  return (
    <>
      <SEO
        title={`Product - ${productId}`}
        description={`Learn more about product ${productId} at SD FASHION SHOP.`}
        url={`product/${productId}`}
      />
      <div>
        <ProductDetail />
        <RelatedProduct />
        {/* <ReviewSection/> */}
      </div>
    </>
  );
};

export default Index;
