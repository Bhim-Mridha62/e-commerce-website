import connectDB from "@/database/db";
import User from "@/Schemas/server/UserSchema";
import verifyUser from "../middleware/verifyUser";
import Product from "@/Schemas/server/ProductSchema";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "GET":
      return verifyUser(getCart)(req, res);
    case "POST":
      return verifyUser(addItemToCart)(req, res);
    case "DELETE":
      return verifyUser(removeItemFromCart)(req, res);
    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}

const getCart = async (req: NextApiRequest, res: NextApiResponse) => {
  //@ts-ignore
  const { userId } = req;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const AllProductId = user.cart.map((item: any) => item?.productID);
    const cartDetails = await Product.find({
      _id: { $in: AllProductId },
    }).select("_id title price discountPercentage rating thumbnail");
    const mergedCart = user.cart
      .map((cartItem: any) => {
        const productDetails = cartDetails.find(
          (product) =>
            product?._id?.toString() === cartItem?.productID?.toString()
        );
        if (productDetails) {
          // Convert Mongoose document to plain JavaScript object
          const plainProductDetails = productDetails.toObject();
          return {
            ...plainProductDetails,
            quantity: cartItem.quantity,
            Size: cartItem?.Size || "",
          };
        }
        return null;
      })
      .filter((item: any) => item !== null);
    res.status(200).json({ success: true, data: mergedCart });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

const addItemToCart = async (req: NextApiRequest, res: NextApiResponse) => {
  const { productId, quantity, Size } = req.body;
  //@ts-ignore
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const itemIndex = user.cart.findIndex(
      (item: any) => item.productID?.toString() === productId
    );
    if (itemIndex > -1) {
      user.cart[itemIndex].quantity = quantity;
      user.cart[itemIndex].Size = Size;
    } else {
      user.cart.push({ productID: productId, quantity: quantity, Size: Size });
    }
    await user.save();
    res.status(200).json({ success: true, data: user.cart });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};

const removeItemFromCart = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { productId } = req.body;
  //@ts-ignore
  const { userId } = req;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.cart = user.cart.filter((item: any) => item.productID !== productId);
    await user.save();
    res.status(200).json({ success: true, data: user.cart });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
      error: error.message,
    });
  }
};
