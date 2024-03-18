"use client"

import EmptyCart from "@/components/cart/EmptyCart";
import AddCardItem from "@/components/cart/addCardItem";
import { useEffect, useState } from "react";

function index() {
  const [cartItems, setCartItems] = useState([{
    "id":1,
    "title":"iPhone 9",
    "description":"An apple mobile which is nothing like apple",
    "price":549,
    "discountPercentage":12.96,
    "rating":4.69,
    "stock":94,
    "brand":"Apple",
    "category":"smartphones",
    "thumbnail":"https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    "images":[
       "https://cdn.dummyjson.com/product-images/1/1.jpg",
       "https://cdn.dummyjson.com/product-images/1/2.jpg",
       "https://cdn.dummyjson.com/product-images/1/3.jpg",
       "https://cdn.dummyjson.com/product-images/1/4.jpg",
       "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
    ]
 },
 {
    "id":2,
    "title":"iPhone X",
    "description":"SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    "price":899,
    "discountPercentage":17.94,
    "rating":4.44,
    "stock":34,
    "brand":"Apple",
    "category":"smartphones",
    "thumbnail":"https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
    "images":[
       "https://cdn.dummyjson.com/product-images/2/1.jpg",
       "https://cdn.dummyjson.com/product-images/2/2.jpg",
       "https://cdn.dummyjson.com/product-images/2/3.jpg",
       "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
    ]
 }])
  return (
    <div>
      <div>
        {cartItems.length !=0 ?cartItems?.map((data)=>(
          <AddCardItem cartItems={data}/>
        )):<EmptyCart/> }
      </div>
    </div>
  )
}

export default index