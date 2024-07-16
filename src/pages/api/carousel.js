import CarouselImage from "@/Schemas/server/CarouselImageSchema";
import connectDB from "@/database/db";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "GET":
      return getImages(req, res);
    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

const getImages = async (req, res) => {
  try {
    const images = await CarouselImage.find().select("-__v -_id");
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching images",
      error: error.message,
    });
  }
};
