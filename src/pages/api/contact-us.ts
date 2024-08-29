import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
require("dotenv").config();
const SMTP_SERVICE_EMAIL = process.env.SMTP_SERVICE_EMAIL;
const SMTP_SERVICE_EMAIL_PASSWORD = process.env.SMTP_SERVICE_EMAIL_PASSWORD;
const SMTP_SERVICE_USER = process.env.SMTP_SERVICE_USER;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, message, name, phone, address } = req.body;

  try {
    var transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: SMTP_SERVICE_USER,
        pass: SMTP_SERVICE_EMAIL_PASSWORD,
      },
    });
    const emailHtml = `
    <div style="font-family: Arial, sans-serif; color: #181818; max-width: 600px; margin: auto; padding: 20px; background-color: #f4f4f4;">
      <h2 style="color: #181818; text-align: center;">
        Contact Us User data
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <tr>
          <td style="padding: 15px; border: 1px solid #ddd; background-color: #f7f7f7;"><strong>Name</strong></td>
          <td style="padding: 15px; border: 1px solid #ddd;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 15px; border: 1px solid #ddd; background-color: #f7f7f7;"><strong>Phone Number</strong></td>
          <td style="padding: 15px; border: 1px solid #ddd;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 15px; border: 1px solid #ddd; background-color: #f7f7f7;"><strong>Email</strong></td>
          <td style="padding: 15px; border: 1px solid #ddd;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 15px; border: 1px solid #ddd; background-color: #f7f7f7;"><strong>Message</strong></td>
          <td style="padding: 15px; border: 1px solid #ddd;">${message}</td>
        </tr>
        <tr>
          <td style="padding: 15px; border: 1px solid #ddd; background-color: #f7f7f7;"><strong>Address</strong></td>
          <td style="padding: 15px; border: 1px solid #ddd;">${address}</td>
        </tr>
      </table>
    </div>
  `;
    var mailOptions = {
      from: SMTP_SERVICE_EMAIL,
      to: "bhimmridha62@gmail.com,debasishbiswas9442@gmail.com",
      subject: "Contact Us",
      html: emailHtml,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res
          .status(500)
          .json({ message: "Failed to send message. Please try again later." });
      } else {
        console.log("Email sent: " + info.response);
        return res
          .status(200)
          .json({ message: "Your message has been sent successfully!" });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send message. Please try again later." });
  }
}
