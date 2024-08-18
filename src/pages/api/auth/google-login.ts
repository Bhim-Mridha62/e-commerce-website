import { NextApiRequest, NextApiResponse } from "next";

export default (_: NextApiRequest, res: NextApiResponse) => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_ID || "",
    redirect_uri: `${process.env.NEXT_PUBLIC_API_BASE_URl}api/callback`,
    scope: "profile email",
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  const googleLoginUrl = `${
    process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL
  }?${params.toString()}`;
  res.redirect(googleLoginUrl);
};
