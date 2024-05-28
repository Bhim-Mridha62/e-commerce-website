import jwt from "jsonwebtoken";

const verifyUser = (handler) => {
  return async (req, res) => {
    try {
      const token = req?.headers?.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized user" });
      }

      const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
      req.userId = decoded.id;
      return handler(req, res);
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Unauthorized user" });
    }
  };
};

export default verifyUser;
