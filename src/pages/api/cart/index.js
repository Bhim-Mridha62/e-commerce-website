import connectDB from "@/database/db";
import User from "@/Schemas/server/UserSchema";
import verifyUser from "../middleware/verifyUser";
import Product from "@/Schemas/server/ProductSchema"
export default async function handler(req, res) {
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

const getCart = async (req, res) => {
  const { userId } = req;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const AllProductId=user.cart.map(item=>item?.productID)
    const cartDetails= await Product.find({
      _id:{$in:AllProductId}
    }).select('_id title price discountPercentage rating thumbnail');
    console.log(cartDetails);
    console.log(user.cart);
    const mergedCart = user.cart.map(cartItem => {
      const productDetails = cartDetails.find(product => product._id.toString() === cartItem.productID.toString());
      return {
        ...productDetails,
        quantity: cartItem.quantity,
        cartID: cartItem._id
      };
    });
    console.log(mergedCart,"mergedCart");
    res.status(200).json({ success: true, data:mergedCart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

const addItemToCart = async (req, res) => {
  const { productId } = req.body;
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const itemIndex = user.cart.findIndex(
      (item) => item.productID?.toString() === productId
    );
    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += 1;
    } else {
      user.cart.push({ productID:productId, quantity: 1 });
    }
    await user.save();
    res.status(200).json({ success: true, data: user.cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};

const removeItemFromCart = async (req, res) => {
  const { productId } = req.body;
  const { userId } = req;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.cart = user.cart.filter(
      (item) => item.productID.toString() !== productId
    );
    await user.save();
    res.status(200).json({ success: true, data: user.cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
      error: error.message,
    });
  }
};
