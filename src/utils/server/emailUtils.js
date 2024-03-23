import nodemailer from 'nodemailer';
require('dotenv').config();
const SERVICE_EMAIL = process.env.SERVICE_EMAIL;
const SERVICE_EMAIL_PASSWORD= process.env.SERVICE_EMAIL_PASSWORD;
export async function sendOTPByEmail(email, otp) {

    try {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: SERVICE_EMAIL,
          pass: SERVICE_EMAIL_PASSWORD
        }
      });
      
      var mailOptions = {
        from: SERVICE_EMAIL,
        to: email,
        subject: 'Very otp',
        text: `Very otp${otp}` 
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }

}
