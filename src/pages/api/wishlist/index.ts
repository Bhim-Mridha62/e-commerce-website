import connectDB from "@/database/db";
import User from "@/Schemas/server/UserSchema";
import verifyUser from "../middleware/verifyUser";
import { NextApiRequest, NextApiResponse } from "next";
import { ISchemaWishlist } from "@/types/backentType";
import mongoose from "mongoose";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "GET":
      return verifyUser(getWishlist)(req, res);
    case "POST":
      return verifyUser(addItemToWishlist)(req, res);
    case "DELETE":
      return verifyUser(removeItemFromWishlist)(req, res);
    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

const getWishlist = async (req: any, res: NextApiResponse) => {
  const { userId } = req;

  try {
    const user = await User.findById(userId).select("wishlist");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const wishlist = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId as string) },
      },
      {
        $project: { wishlist: 1 },
      },
      { $unwind: "$wishlist" },
      {
        $lookup: {
          from: "products",
          localField: "wishlist.productID",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $project: {
          _id: "$productDetails._id",
          title: "$productDetails.title",
          price: "$productDetails.price",
          discountPercentage: "$productDetails.discountPercentage",
          rating: "$productDetails.rating",
          thumbnail: "$productDetails.thumbnail",
        },
      },
    ]);

    return res
      .status(200)
      .json({ success: true, length: wishlist.length, data: wishlist });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

const addItemToWishlist = async (req: any, res: NextApiResponse) => {
  const { productId } = req.body;
  const { userId } = req;
  try {
    const user = await User.findById(userId).select("wishlist");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isProductInWishlist = user.wishlist.some(
      (item: ISchemaWishlist) => item?.productID === productId
    );
    if (isProductInWishlist) {
      return res
        .status(400)
        .json({ success: false, message: "Product already in wishlist" });
    }
    user.wishlist.push({ productID: productId });
    await user.save();
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};

const removeItemFromWishlist = async (req: any, res: NextApiResponse) => {
  const { productId } = req.body;
  const { userId } = req;

  try {
    const user = await User.findById(userId).select("wishlist");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.wishlist = user.wishlist.filter(
      (item: ISchemaWishlist) => item.productID !== productId
    );
    await user.save();
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
      error: error.message,
    });
  }
};
