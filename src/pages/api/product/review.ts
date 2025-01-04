import connectDB from "@/database/db";
import verifyUser from "../middleware/verifyUser";
import { NextApiRequest, NextApiResponse } from "next";
import ProductReview from "@/Schemas/server/ProductReview";
import mongoose from "mongoose";
import { handleError } from "@/utils/server/handleError";
import { handleResponse } from "@/utils/server/handleResponse";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  const { method } = req;
  switch (method) {
    case "GET":
      return getReview(req, res);
    case "POST":
      return verifyUser(createReview)(req, res);
    case "PUT":
      return verifyUser(updateReview)(req, res);
    case "DELETE":
      return verifyUser(deleteReview)(req, res);
    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
const getReview = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { product_id, limit = 2, skip = 0 } = req.query;
    var stars = [];

    // Fetch reviews

    const AllReviews = await ProductReview.find({
      product_id: product_id,
    })
      .sort({ createdAt: -1 })
      .skip(parseInt(skip as string))
      .limit(parseInt(limit as string))
      .populate({ path: "user_id", select: "name profile_pic" })
      .lean();

    const review = AllReviews.map((item) => ({
      _id: item?._id,
      user_id: item?.user_id?._id,
      name: item?.user_id?.name,
      profile_pic: item?.user_id?.profile_pic,
      product_id: item?.product_id,
      rating: item?.rating,
      like: item?.like,
      comment: item?.comment,
      createdAt: item?.createdAt,
      images: item?.images,
    }));

    if (limit == 2) {
      stars = await ProductReview.aggregate([
        {
          $match: {
            product_id: new mongoose.Types.ObjectId(product_id as string),
          },
        },
        { $sort: { createdAt: -1 } },
        {
          $group: {
            averageRating: { $avg: "$rating" },
            _id: "$product_id",
            totalRatings: { $sum: 1 },
            1: { $sum: { $cond: [{ $eq: ["$rating", 1] }, 1, 0] } },
            2: { $sum: { $cond: [{ $eq: ["$rating", 2] }, 1, 0] } },
            3: { $sum: { $cond: [{ $eq: ["$rating", 3] }, 1, 0] } },
            4: { $sum: { $cond: [{ $eq: ["$rating", 4] }, 1, 0] } },
            5: { $sum: { $cond: [{ $eq: ["$rating", 5] }, 1, 0] } },
          },
        },
        {
          $addFields: {
            averageRating: { $round: ["$averageRating", 1] },
            "1_star": {
              $ceil: { $multiply: [{ $divide: ["$1", "$totalRatings"] }, 100] },
            },
            "2_star": {
              $ceil: { $multiply: [{ $divide: ["$2", "$totalRatings"] }, 100] },
            },
            "3_star": {
              $ceil: { $multiply: [{ $divide: ["$3", "$totalRatings"] }, 100] },
            },
            "4_star": {
              $ceil: { $multiply: [{ $divide: ["$4", "$totalRatings"] }, 100] },
            },
            "5_star": {
              $ceil: { $multiply: [{ $divide: ["$5", "$totalRatings"] }, 100] },
            },
          },
        },
        {
          $project: {
            averageRating: 1,
            totalRatings: 1,
            _id: 0,
            "1_star": 1,
            "2_star": 1,
            "3_star": 1,
            "4_star": 1,
            "5_star": 1,
          },
        },
      ]);
    }

    handleResponse(res, 200, "Review fetched successfully", {
      review,
      stars: stars[0],
    });
  } catch (error) {
    handleError(error, res, 500, "An unexpected error occurred");
  }
};
const createReview = async (req: any, res: NextApiResponse) => {
  try {
    const { userId } = req;
    const reviewData = req.body;

    // Create a new instance of the ProductReview model
    const review = new ProductReview({ ...reviewData, user_id: userId });

    // Validate the schema manually
    await review.validate();

    // Save the review to the database
    await review.save();

    // Return the success response
    handleResponse(res, 201, "Review added successfully", review);
  } catch (error: any) {
    handleError(error, res, 500, "An unexpected error occurred");
  }
};

const updateReview = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { like, _id } = req.body;
    if (!_id) {
      handleError({}, res, 400, "Review id required fields");
    }
    if (like) {
      const review = await ProductReview.findByIdAndUpdate(
        { _id },
        { $inc: { like: 1 } },
        { new: true }
      );
      return handleResponse(res, 200, "like added successfully", review);
    }
  } catch (error) {
    handleError(error, res, 500, "An unexpected error occurred");
  }
};
const deleteReview = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req?.body;
    if (!_id) {
      handleError({}, res, 400, "Review id required fields");
    }
    const delete_review = await ProductReview.findByIdAndDelete(_id);
    if (!delete_review) {
      handleError({}, res, 404, "Review not found");
    }
    handleResponse(res, 200, "Review deleted successfully");
  } catch (error: any) {
    handleError(error, res, 500, "An unexpected error occurred");
  }
};
