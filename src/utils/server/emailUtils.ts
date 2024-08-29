import nodemailer from "nodemailer";
require("dotenv").config();
const SMTP_SERVICE_EMAIL = process.env.SMTP_SERVICE_EMAIL;
const SMTP_SERVICE_EMAIL_PASSWORD = process.env.SMTP_SERVICE_EMAIL_PASSWORD;
const SMTP_SERVICE_USER = process.env.SMTP_SERVICE_USER;

export async function sendOTPByEmail(email: string, otp: number) {
  try {
    var transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: SMTP_SERVICE_USER,
        pass: SMTP_SERVICE_EMAIL_PASSWORD,
      },
    });
    var mailOptions = {
      from: SMTP_SERVICE_EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your one-time password (OTP) is: ${otp}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
