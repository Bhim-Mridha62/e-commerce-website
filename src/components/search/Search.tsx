import React, { useEffect, useState } from "react";
import ProductCard from "../common/productcard/productcard";
import NoResults from "./noResults";

const Search = ({ product }: { product: any }) => {
  console.log(product, "product");

  return (
    <div className="checksixe flex flex-wrap min-h-screen justify-center md:gap-12 bg-white Msm:gap-2">
      {product?.length ? (
        product?.map((product: any) => (
          <ProductCard key={product._id} product={product} user={false} />
        ))
      ) : (
        <NoResults />
      )}
    </div>
  );
};

export default Search;
