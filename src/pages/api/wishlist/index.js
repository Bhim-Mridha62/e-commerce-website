import connectDB from "@/database/db";
import User from "@/Schemas/server/UserSchema";
import verifyUser from "../middleware/verifyUser";
import Product from "@/Schemas/server/ProductSchema";
export default async function handler(req, res) {
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

const getWishlist = async (req, res) => {
  const { userId } = req;

  try {
    const user = await User.findById(userId).select("wishlist");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const AllProductId = user.wishlist.map((item) => item?.productID);
    const cartDetails = await Product.find({
      _id: { $in: AllProductId },
    }).select("_id title price discountPercentage rating thumbnail");
    res.status(200).json({ success: true, data: cartDetails });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

const addItemToWishlist = async (req, res) => {
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
      (item) => item?.productID === productId
    );
    if (isProductInWishlist) {
      return res
        .status(400)
        .json({ success: false, message: "Product already in wishlist" });
    }
    user.wishlist.push({ productID: productId });
    await user.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};

const removeItemFromWishlist = async (req, res) => {
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
      (item) => item.productID !== productId
    );
    await user.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
      error: error.message,
    });
  }
};
