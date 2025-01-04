import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { NextApiResponse } from "next";

const verifyUser = (handler: any) => {
  return async (req: any, res: NextApiResponse) => {
    const secret = process.env.JWT_TOKEN_KEY || "default_secret_key";
    try {
      const token = req?.headers?.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized user" });
      }

      const decoded = jwt.verify(token, secret) as { id: string };
      if (!decoded?.id || !mongoose.Types.ObjectId.isValid(decoded?.id)) {
        return res.status(404).json({ message: "User Not Found" });
      }
      req.userId = decoded.id;
      return handler(req, res);
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Unauthorized user" });
    }
  };
};

export default verifyUser;
