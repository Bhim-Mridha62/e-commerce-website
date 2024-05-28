import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../Schemas/server/UserSchema";
import CreateToken from "../../../utils/server/SecretToken";
import connectDB from "@/database/db";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "invalid Password" });
    }
    const stringValue = await user._id.toString();
    const jwtToken = CreateToken(stringValue);
    user.SecretToken = jwtToken;
    await user.save();
    const sanitizedUser = {
      _id: user._id,
      FirstName: user.FirstName,
      LastName: user.LastName,
      email: user.email,
      cart: user.cart,
      wishlist: user.wishlist,
      SecretToken: user.SecretToken,
    };
    res.status(201).json({ message: "Sign sucessfully", user: sanitizedUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
