import connectDB from "@/database/db";
import Category from "@/Schemas/server/CategorySchema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "GET":
      return getCategories(req, res);
    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

const getCategories = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const categories = await Category.find().select("-__v");
    res.status(200).json({ success: true, data: categories });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message,
    });
  }
};
