import connectDB from "@/database/db";
import { NextApiRequest, NextApiResponse } from "next";
import verifyUser from "./middleware/verifyUser";
import User from "@/Schemas/server/UserSchema";
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
  const { isAddress } = req.query;
  try {
    // isAddress if 1 return only address for Address auto field in order page
    if (Number(isAddress)) {
      const Address = await User.findById(userId).select("address");
      return res.status(200).send(Address);
    }
    const profile_data = await User.aggregate([
      // Match the user document by userId
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },

      // Lookup for orders based on userId
      {
        $lookup: {
          from: "orders",
          let: { userId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$userId", "$$userId"] } } },
            { $sort: { OrderDate: -1 } }, // Sort by OrderDate in descending order
            {
              $project: {
                _id: 1,
                title: 1,
                image: 1,
                price: 1,
                OrderStatus: 1,
                OrderDate: 1,
              },
            },
          ],
          as: "orders",
        },
      },

      // Lookup for wishlist products
      {
        $lookup: {
          from: "products",
          let: { wishlistProductIds: "$wishlist.productID" },
          pipeline: [
            { $match: { $expr: { $in: ["$_id", "$$wishlistProductIds"] } } },
            { $sort: { createdAt: -1 } },
            {
              $project: {
                _id: 1,
                title: 1,
                price: 1,
                thumbnail: 1,
              },
            },
          ],
          as: "wishlist",
        },
      },

      // Lookup for cart products with limit to 3 products
      {
        $lookup: {
          from: "products",
          let: { cartProductIds: "$cart.productID" },
          pipeline: [
            { $match: { $expr: { $in: ["$_id", "$$cartProductIds"] } } },
            { $sort: { createdAt: -1 } },
            {
              $project: {
                _id: 1,
                title: 1,
                price: 1,
                thumbnail: 1,
                Size: 1,
                quantity: 1,
              },
            },
          ],
          as: "cart",
        },
      },

      // Project the final output
      {
        $project: {
          address: 1,
          name: 1,
          emailOrPhone: 1,
          profile_pic: 1,
          cart_length: { $size: "$cart" },
          wishlist_length: { $size: "$wishlist" },
          order_length: { $size: "$orders" }, // Count of orders
          orders: { $slice: ["$orders", 0, 3] }, // Get the first 3 orders
          wishlists: { $slice: ["$wishlist", 0, 3] }, // Get the first 3 wishlist products
          carts: { $slice: ["$cart", 0, 3] }, // Include the cart data
        },
      },
    ]);

    // Return the data in response
    return res.status(200).json({ success: true, data: profile_data[0] });
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
