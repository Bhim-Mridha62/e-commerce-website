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
      const { id } = req.query;
      const data = await Product.findById(id).select("-reviews -__v");
      if (data) {
        res.status(200).json({ data: data });
      } else {
        res.status(404).send("Product not found");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
