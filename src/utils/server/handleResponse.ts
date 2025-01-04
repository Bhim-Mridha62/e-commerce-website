import { NextApiResponse } from "next";
export const handleResponse = (
  res: NextApiResponse,
  status: number,
  message: string,
  data: any = null // Make data optional
) => {
  return res.status(status).json({ message, data, success: true });
};
