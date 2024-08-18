import React from "react";
import ProductDetail from "@/components/productDetails/ProductDetails";
import ReviewSection from "@/components/productDetails/ReviewSection";
import RelatedProduct from "@/components/productDetails/RelatedProduct";
const Index = () => {
  return (
    <div>
      <ProductDetail />
      <RelatedProduct />
      {/* <ReviewSection/> */}
    </div>
  );
};

export default Index;
