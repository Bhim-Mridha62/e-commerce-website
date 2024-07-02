import Product from "@/Schemas/server/ProductSchema";
import connectDB from "@/database/db";
export default async function handler(req, res) {
  await connectDB();
  const { method } = req;
  switch (method) {
    case "GET":
      return getReview(req, res);
    case "POST":
      return addReview(req, res);
    case "PUT":
      return updateReview(req, res);
    case "DELETE":
      return deleteReview(req, res);
    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
const getReview = async (req, res) => {
  const { id } = req?.query;
  const data = await Product.findById(id).select("reviews -_id");
  res.status(200).json({ data: data });
};
const addReview = async (req, res) => {};
const updateReview = async (req, res) => {};
const deleteReview = async (req, res) => {};
