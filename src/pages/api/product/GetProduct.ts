import Product from "@/Schemas/server/ProductSchema";
import connectDB from "@/database/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed" });
  } else {
    try {
      const { skip, limit } = req.query;
      //@ts-ignore
      const products = await Product.find().limit(limit).skip(skip).select({
        title: 1,
        thumbnail: 1,
        price: 1,
        rating: 1,
        discountPercentage: 1,
      });
      if (products.length > 0) {
        res.status(200).json({ data: products, length: products.length });
      } else {
        res.status(404).json({ message: "Products not found" });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
