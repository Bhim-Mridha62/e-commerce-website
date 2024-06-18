import nodemailer from "nodemailer";
require("dotenv").config();
const SERVICE_EMAIL = process.env.SERVICE_EMAIL;
const SERVICE_EMAIL_PASSWORD = process.env.SERVICE_EMAIL_PASSWORD;
export async function sendOTPByEmail(email, otp) {
  try {
    var transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: "767148001@smtp-brevo.com",
        pass: "CfO8bZwmvzM7yqXK",
      },
    });
    var mailOptions = {
      from: "yuvrajpradeep2018@gmail.com",
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
    res.status(500).json({ message: "Server error" });
  }
}
