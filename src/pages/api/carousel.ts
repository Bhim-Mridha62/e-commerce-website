import CarouselImage from "@/Schemas/server/CarouselImageSchema";
import connectDB from "@/database/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "GET":
      return getImages(req, res);
    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

const getImages = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const images = await CarouselImage.find().select("-__v _id");
    res.status(200).json(images);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching images",
      error: error.message,
    });
  }
};
