require("dotenv").config();
import Jwt from "jsonwebtoken";
export default function CreateToken(id: string) {
  return Jwt.sign({ id }, process.env.JWT_TOKEN_KEY || "", {
    expiresIn: "7d",
  });
}
