import React, { useEffect, useState } from "react";
import ProductCard from "../common/productcard/productcard";

const Search = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([
      {
        _id: "65ff184d28d7c182b26feda4",
        title: "iPhone X",
        price: 8754,
        discountPercentage: 17.94,
        rating: 4.44,
        thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      },
      {
        _id: "65ff184d28d7c182b26feda3",
        title: "iPhone 9",
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
      },
      {
        _id: "65ff184d28d7c182b26feda7",
        title: "Huawei P30",
        price: 499,
        discountPercentage: 10.58,
        rating: 4.09,
        thumbnail: "https://cdn.dummyjson.com/product-images/5/thumbnail.jpg",
      },
      {
        _id: "65ff184d28d7c182b26feda8",
        title: "MacBook Pro",
        price: 1749,
        discountPercentage: 11.02,
        rating: 4.57,
        thumbnail: "https://cdn.dummyjson.com/product-images/6/thumbnail.png",
      },
      {
        _id: "65ff184d28d7c182b26fedaa",
        title: "Microsoft Surface Laptop 4",
        price: 1499,
        discountPercentage: 10.23,
        rating: 4.43,
        thumbnail: "https://cdn.dummyjson.com/product-images/8/thumbnail.jpg",
      },
      {
        _id: "65ff184d28d7c182b26feda9",
        title: "Samsung Galaxy Book",
        price: 1499,
        discountPercentage: 4.15,
        rating: 4.25,
        thumbnail: "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg",
      },
      {
        _id: "65ff184d28d7c182b26fedab",
        title: "Infinix INBOOK",
        price: 1099,
        discountPercentage: 11.83,
        rating: 4.54,
        thumbnail: "https://cdn.dummyjson.com/product-images/9/thumbnail.jpg",
      },
      {
        _id: "65ff184d28d7c182b26fedac",
        title: "HP Pavilion 15-DK1056WM",
        price: 1099,
        discountPercentage: 6.18,
        rating: 4.43,
        thumbnail: "https://cdn.dummyjson.com/product-images/10/thumbnail.jpeg",
      },
      {
        _id: "65ff184d28d7c182b26fedad",
        title: "perfume Oil",
        price: 13,
        discountPercentage: 8.4,
        rating: 4.26,
        thumbnail: "https://cdn.dummyjson.com/product-images/11/thumbnail.jpg",
      },
      {
        _id: "65ff184d28d7c182b26fedae",
        title: "Brown Perfume",
        price: 40,
        discountPercentage: 15.66,
        rating: 4,
        thumbnail: "https://cdn.dummyjson.com/product-images/12/thumbnail.jpg",
      },
      {
        _id: "65ff184d28d7c182b26fedaf",
        title: "Fog Scent Xpressio Perfume",
        price: 13,
        discountPercentage: 8.14,
        rating: 4.59,
        thumbnail: "https://cdn.dummyjson.com/product-images/13/thumbnail.webp",
      },
      {
        _id: "65ff184d28d7c182b26fedb0",
        title: "Non-Alcoholic Concentrated Perfume Oil",
        price: 120,
        discountPercentage: 15.6,
        rating: 4.21,
        thumbnail: "https://cdn.dummyjson.com/product-images/14/thumbnail.jpg",
      },
      {
        _id: "65ff184d28d7c182b26fedb1",
        title: "Eau De Perfume Spray",
        price: 30,
        discountPercentage: 10.99,
        rating: 4.7,
        thumbnail: "https://cdn.dummyjson.com/product-images/15/thumbnail.jpg",
      },
      {
        _id: "65ff184d28d7c182b26fedb2",
        title: "Hyaluronic Acid Serum",
        price: 19,
        discountPercentage: 13.31,
        rating: 4.83,
        thumbnail: "https://cdn.dummyjson.com/product-images/16/thumbnail.jpg",
      },
      {
        _id: "65ff184d28d7c182b26feda5",
        title: "Samsung Universe 9",
        price: 1249,
        discountPercentage: 15.46,
        rating: 4.09,
        thumbnail: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
      },
      {
        _id: "65ff184d28d7c182b26feda6",
        title: "OPPOF19",
        price: 280,
        discountPercentage: 17.91,
        rating: 4.3,
        thumbnail: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
      },
      {
        _id: "65ff184d28d7c182b26fedb5",
        title: "Skin Beauty Serum.",
        price: 46,
        discountPercentage: 10.68,
        rating: 4.42,
        thumbnail: "https://cdn.dummyjson.com/product-images/19/thumbnail.jpg",
      },
      {
        _id: "65ff184d28d7c182b26fedb6",
        title: "Freckle Treatment Cream- 15gm",
        price: 70,
        discountPercentage: 16.99,
        rating: 4.06,
        thumbnail: "https://cdn.dummyjson.com/product-images/20/thumbnail.jpg",
      },
      {
        _id: "65ff184d28d7c182b26fedb7",
        title: "- Daal Masoor 500 grams",
        price: 20,
        discountPercentage: 4.81,
        rating: 4.44,
        thumbnail: "https://cdn.dummyjson.com/product-images/21/thumbnail.png",
      },
      {
        _id: "65ff184d28d7c182b26fedb8",
        title: "Elbow Macaroni - 400 gm",
        price: 14,
        discountPercentage: 15.58,
        rating: 4.57,
        thumbnail: "https://cdn.dummyjson.com/product-images/22/thumbnail.jpg",
      },
    ]);
  }, []);

  return (
    <div className="checksixe flex flex-wrap min-h-screen justify-center md:gap-12 bg-white Msm:gap-2">
      {data?.length &&
        data?.map((product) => (
          <ProductCard key={product._id} product={product} user={false} />
        ))}
    </div>
  );
};

export default Search;
