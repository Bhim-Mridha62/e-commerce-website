import connectDB from "@/database/db";
import verifyUser from "../middleware/verifyUser";
import User from "@/Schemas/server/UserSchema";
export default async function handler(req, res) {
  await connectDB();
  if (req.method === "GET") {
    return verifyUser(cartCount)(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
const cartCount = async (req, res) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ data: user?.cart?.length });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};
