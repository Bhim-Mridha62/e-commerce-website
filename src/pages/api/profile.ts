import connectDB from "@/database/db";
import { NextApiRequest, NextApiResponse } from "next";
import verifyUser from "./middleware/verifyUser";
import User from "@/Schemas/server/UserSchema";
import Product from "@/Schemas/server/ProductSchema";
import Order from "@/Schemas/server/OrderSchema";
import mongoose from "mongoose";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "GET":
      return verifyUser(getProfile)(req, res);
    case "POST":
      return verifyUser(postProfile)(req, res);
    case "PUT":
      return verifyUser(putProfile)(req, res);
    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
async function getProfile(req: any, res: NextApiResponse) {
  const { userId } = req;
  try {
    if (!userId) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Get total count of orders

    const totalCountResult = await Order.aggregate([
      {
        $match: { userId: mongoose.Types.ObjectId.createFromHexString(userId) },
      },
      {
        $count: "orderLength",
      },
    ]);
    const orderLength =
      totalCountResult.length > 0 ? totalCountResult[0].orderLength : 0;

    // Get limited orders
    const orders = await Order.aggregate([
      {
        $match: { userId: mongoose.Types.ObjectId.createFromHexString(userId) },
      },
      {
        $project: {
          image: 1,
          price: 1,
          title: 1,
          OrderStatus: 1,
          productID: 1,
          OrderDate: 1,
        },
      },
      {
        $sort: { OrderDate: -1 },
      },
      {
        $limit: 3,
      },
    ]);

    // Get user profile data

    const user = await User.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId.createFromHexString(userId) },
      },
      {
        $project: {
          name: 1,
          emailOrPhone: 1,
          address: 1,
          wishlistLength: { $size: "$wishlist" },
          cartLength: { $size: "$cart" },
          profile_pic: 1,
          wishlist: { $slice: ["$wishlist", 3] },
          cart: { $slice: ["$cart", 3] },
        },
      },
    ]);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Get array of Product IDs from the wishlist

    const wishlistProductId = user[0]?.wishlist.map(
      (data: any) => data?.productID
    );
    if (wishlistProductId.length > 0) {
      // Find all wishlist data
      const wishlistProducts = await Product.find({
        _id: { $in: wishlistProductId },
      }).select("thumbnail title price");
      user[0].wishlist = user[0].wishlist.map((data: any) => {
        const product = wishlistProducts.find(
          (p) => p._id.toString() === data.productID.toString()
        );
        return {
          ...data,
          thumbnail: product?.thumbnail || "",
          price: product?.price,
          title: product?.title,
        };
      });
    }

    // Get array of Product IDs from the cart

    const cartProductId = user[0]?.cart.map((data: any) => data?.productID);
    if (cartProductId.length > 0) {
      // find all cart data
      const cartProducts = await Product.find({
        _id: { $in: cartProductId },
      }).select("thumbnail title price");
      user[0].cart = user[0].cart.map((data: any) => {
        const product = cartProducts.find(
          (p) => p._id.toString() === data.productID.toString()
        );
        return {
          ...data,
          thumbnail: product?.thumbnail || "",
          price: product?.price,
          title: product?.title,
        };
      });
    }
    res.status(200).json({
      order: orders,
      orderLength,
      user: user[0],
    });
  } catch (error) {
    console.log(error, "error");

    return res.status(500).json(error);
  }
}
async function putProfile(req: any, res: NextApiResponse) {
  try {
    const { userId } = req;
    const { address, isUser, user } = req?.body;
    const UpdateData = isUser ? { ...user } : { address: { ...address } };
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: UpdateData },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res?.status(500).json({
      success: false,
      message: "Something wrong please try again",
    });
  }
}
async function postProfile() {}
