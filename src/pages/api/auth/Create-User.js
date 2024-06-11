import connectDB from "@/database/db";
import User from "@/Schemas/server/UserSchema";
import CreateToken from "@/utils/server/SecretToken";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, emailOrPhone, password } = req.body;

  try {
    const existingUser = await User.findOne({ emailOrPhone });

    if (existingUser) {
      // Update existing user
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.name = name;
      existingUser.password = hashedPassword;
      const jwtToken = CreateToken(existingUser._id);
      existingUser.SecretToken = jwtToken;

      await existingUser.save();

      const sanitizedUser = {
        _id: existingUser._id,
        name: existingUser.name,
        emailOrPhone: existingUser.emailOrPhone,
        cart: existingUser.cart,
        wishlist: existingUser.wishlist,
        SecretToken: existingUser.SecretToken,
      };

      return res.status(200).json({ data: sanitizedUser });
    } else {
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      let newUser = new User({ emailOrPhone, password: hashedPassword, name });
      await newUser.save();

      const jwtToken = CreateToken(newUser._id);
      newUser.SecretToken = jwtToken;

      const sanitizedUser = {
        _id: newUser._id,
        name: newUser.name,
        emailOrPhone: newUser.emailOrPhone,
        cart: newUser.cart,
        wishlist: newUser.wishlist,
        SecretToken: newUser.SecretToken,
      };

      await newUser.save();

      return res.status(200).json({ data: sanitizedUser });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
}
