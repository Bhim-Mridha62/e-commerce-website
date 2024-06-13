import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import TimelineData from "./TimelineData";
import { GetOrderStatusColour } from "@/utils/client/colourCode";
import { useRouter } from "next/router";

function MyOrderContent() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems([
      {
        key: "1",
        status: "pending",
        title: "iPhone 9",
        image: "https://cdn.dummyjson.com/product-images/87/thumbnail.jpg",
        price: 197,
        StatusOrder: [
          { Order_Received: "Done", time: "Thu, 14th Mar" },
          { Order_Shipped: "Done", time: "Thu, 18th Mar" },
          { Order_Picked: "InHere", time: "Thu, 19th Mar" },
          { Order_Delivery: "pending", time: "Thu, 25th Mar" },
          { Order_Delivered: "pending", time: "Thu, 29th Mar" },
        ],
        StatusDate: "Mar 16",
      },
      {
        key: "2",
        status: "Delivered",
        title: "iPhone 9",
        image: "https://cdn.dummyjson.com/product-images/87/thumbnail.jpg",
        price: 275,
        StatusOrder: [
            { Order_Received: "Done", time: "Thu, 14th Mar" },
            { Order_Shipped: "Done", time: "Thu, 18th Mar" },
            { Order_Picked: "Done", time: "Thu, 19th Mar" },
            { Order_Delivery: "Done", time: "Thu, 25th Mar" },
            { Order_Delivered: "Done", time: "Thu, 29th Mar" },
          ],
        StatusDate: "Apr 09, 2023",
      },
      {
        key: "3",
        status: "cancelled",
        title: 'iPhone 9',
        image: "https://cdn.dummyjson.com/product-images/87/thumbnail.jpg",
        price: 1504,
        StatusOrder: [
            { Order_Received: "Done", time: "Thu, 14th Mar" },
            { Order_Shipped: "cancelled", time: "Thu, 18th Mar" },
            { Order_Picked: "cancelled", time: "Thu, 19th Mar" },
            { Order_Delivery: "cancelled", time: "Thu, 25th Mar" },
            { Order_Delivered: "cancelled", time: "Thu, 29th Mar" },
          ],
        StatusDate: "Oct 29, 2022",
      },
    ]);
  }, []);

  return (
    <div className="min-h-[30vh]">
      {items?.map(data=>(
            <Collapse
            ghost
            items={[
              {
                showArrow:false,
                key: data?.key,
                label: <ProductCard key={data?.key} product={data} />,
                children: <TimelineData StatusText={data?.status} StatusOrder={data?.StatusOrder}/>,
              },
            ]}
          />
      ))}
    </div>
  );
}

export default MyOrderContent;
const ProductCard = ({ product }) => {
  const orderStatusColour = GetOrderStatusColour(product?.status);
  const router=useRouter();
  const handelGiveRate=(e)=>{
    e.stopPropagation()
    router.push(`/myorder/fhfkjefsjgsgsgr6562566559`);
  }
  const handelProductDetails=(e)=>{
    e.stopPropagation()
    router.push(`/product/${"fhfkjefsjgsgsgr6562566559"}`);
  }
  return (
    <div className="flex items-start justify-between p-1 md:px-52  md:border-gray-200 rounded-lg shadow-sm mb-4">
      <div className=" md:flex-row flex-col flex">
        <img
        onClick={(e)=>handelProductDetails(e)}
          className="md:w-24 md:h-24 w-16 h-16 object-cover rounded"
          src={product.image}
          alt={product.title}
        />
        <div className="ml-4">
          <h3 className="md:text-lg text:[15] font-[400] md:font-semibold text-gray-800">
            {product.title}
          </h3>
          <p className="text-gray-800 font-semibold mt-1">₹{product.price}</p>
        </div>
      </div>
      <div className="">
        <p className={`flex items-center md:text-lg `} style={{ color: orderStatusColour }}>
          <span className={`h-3 w-3  rounded-full mr-2`} style={{ backgroundColor: orderStatusColour }}></span>
          {product?.status} on {product.StatusDate}
        </p>
        <p className="text-gray-500">Your item has been {product?.status}</p>
        <button className="text-blue-600 mt-2" onClick={(e)=>handelGiveRate(e)}>
          ★ Give Rate & Review Product
        </button>
      </div>
    </div>
  );
};
