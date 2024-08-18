import connectDB from "@/database/db";
import User from "@/Schemas/server/UserSchema";
import CreateToken from "@/utils/server/SecretToken";
import axios from "axios";
//@ts-ignore
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { token, password, emailOrPhone, name } = req.body;

  if (token) {
    try {
      // Fetch user info from Google
      const { data: userInfo } = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the necessary user info is available
      const { name, email, picture } = userInfo;

      if (!name || !email) {
        return res
          .status(401)
          .json({ message: "Incomplete user information received." });
      }

      // Handle user data based on the retrieved email
      await handleUserData(
        { emailOrPhone: email, name, password: name, picture },
        res
      );
    } catch (error: any) {
      return res.status(500).json({
        message: "Error fetching user information",
        error: error.message,
      });
    }
  } else if (emailOrPhone && password && name) {
    // Handle the case where token is not provided, but emailOrPhone and password are
    await handleUserData({ emailOrPhone, name, password }, res);
  } else {
    return res
      .status(400)
      .json({ message: "Access token or valid credentials are required" });
  }
}

interface UserDataInput {
  emailOrPhone?: string;
  name?: string;
  password?: string;
  picture?: string;
}

const handleUserData = async (
  { emailOrPhone, name, password, picture = "" }: UserDataInput,
  res: NextApiResponse
) => {
  try {
    const existingUser = await User.findOne({ emailOrPhone }).select(
      "-password -__v"
    );

    if (existingUser) {
      if (password === name) {
        res.status(201).json({ data: existingUser });
      } else {
        return res.status(409).json({ message: "User already exists" });
      }
    } else {
      // Create new user
      const hashedPassword = await bcrypt.hash(password || "", 10);
      let newUser = new User({
        emailOrPhone,
        password: hashedPassword,
        name,
      });

      const jwtToken = CreateToken(newUser._id);
      newUser.SecretToken = jwtToken;
      newUser.profile_pic_path = picture;

      await newUser.save();

      const sanitizedUser = {
        _id: newUser._id,
        name: newUser.name,
        emailOrPhone: newUser.emailOrPhone,
        cart: newUser.cart,
        wishlist: newUser.wishlist,
        SecretToken: newUser.SecretToken,
      };

      return res.status(200).json({ data: sanitizedUser });
    }
  } catch (error: any) {
    console.log(error, "error");
    return res.status(500).json({ message: "Server Error", error: error });
  }
};
