import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  if (!code) {
    res.redirect("/sign-in");
    return;
  }

  try {
    const params = new URLSearchParams({
      code: code.toString(),
      client_id: process.env.NEXT_PUBLIC_GOOGLE_ID || "",
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_SECRET || "",
      redirect_uri: `${process.env.NEXT_PUBLIC_API_BASE_URl}api/callback`,
      grant_type: "authorization_code",
    });

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_GOOGLE_TOKEN_API}`,
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = data;
    // Redirect to the homepage or protected route
    res.redirect(`/sign-in/?code=${access_token}`);
  } catch (error) {
    res.redirect("/sign-in");
    res.status(500).json({ error: "Authentication failed" });
  }
};
