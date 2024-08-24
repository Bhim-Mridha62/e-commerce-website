import { google } from "googleapis";
import multer from "multer";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const upload = multer({ dest: "/tmp" });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      return handleUpload(req, res);
    case "DELETE":
      return handleDelete(req, res);
    default:
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
  }
}

const handleUpload = (req: any, res: any) => {
  upload.single("file")(req, res, async (err: any) => {
    if (err) {
      return res.status(500).json({ success: false, error: err });
    }
    const { file } = req;
    if (!file) {
      return res
        .status(400)
        .json({ success: false, error: "No file uploaded" });
    }

    try {
      const { OAuth2 } = google.auth;
      const oAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
      );

      oAuth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      });

      const drive = google.drive({ version: "v3", auth: oAuth2Client });

      const fileMetadata = {
        name: file.originalname,
        parents: ["1ZuRJjvEFaQMCNvV4hCD-bocilmXhwf06"],
      };

      const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
      };

      const response = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: "id",
      });
      const thumbnailUrl = `https://drive.google.com/thumbnail?id=${response.data.id}&sz=w1920`;
      await drive.permissions.create({
        //@ts-ignore
        fileId: response.data.id,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      fs.unlinkSync(file.path);

      res.status(200).json({
        success: true,
        imageUrl: thumbnailUrl,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  });
};

const handleDelete = async (req: any, res: any) => {
  const { imageUrl } = req.query;
  const fileId = imageUrl.match(/id=([^&]+)/)?.[1];
  if (!fileId) {
    return res.status(400).json({
      success: false,
      message: "Failed to extract file ID from the URL",
    });
  }
  try {
    const { OAuth2 } = google.auth;
    const oAuth2Client = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const drive = google.drive({ version: "v3", auth: oAuth2Client });

    await drive.files.delete({
      fileId: fileId,
    });

    res
      .status(200)
      .json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
