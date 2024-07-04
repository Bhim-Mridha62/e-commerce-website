import Product from "@/Schemas/server/ProductSchema";
import connectDB from "@/database/db";
import verifyUser from "../middleware/verifyUser";
const now = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
const currentTime = new Date(now.getTime() + istOffset).toISOString();
export default async function handler(req, res) {
  await connectDB();
  const { method } = req;
  switch (method) {
    case "GET":
      return getReview(req, res);
    case "POST":
      return verifyUser(addReview)(req, res);
    case "PUT":
      return verifyUser(updateReview)(req, res);
    case "DELETE":
      return verifyUser(deleteReview)(req, res);
    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
const getReview = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const data = await Product.findById(id).select("reviews -_id");
    if (!data) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ data: data.reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const addReview = async (req, res) => {
  try {
    const { username, userImage, userId, comment, images, productID, rating } =
      req.body;
    if (!username || !userId || !comment || !productID || !rating) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const product = await Product.findById(productID).select("reviews");
    if (!product) {
      return res.status(404).json({ error: "Product Not Found" });
    }
    const newReview = {
      username,
      userImage,
      userId,
      comment,
      images,
      rating,
      postdAt: currentTime,
    };
    product.reviews.unshift(newReview);
    await product.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateReview = async (req, res) => {};
const deleteReview = async (req, res) => {
  try {
    const { productID, review_id } = req.body;
    if (!productID || !review_id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const product = await Product.findById(productID).select("reviews");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const reviewIndex = product.reviews.findIndex(
      (review) => review._id.toString() === review_id
    );
    if (reviewIndex === -1) {
      return res.status(404).json({ error: "Review not found" });
    }
    product.reviews.splice(reviewIndex, 1);
    await product.save();
    res
      .status(200)
      .json({ message: "Review deleted successfully", data: product.reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
