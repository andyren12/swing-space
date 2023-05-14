const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

async function sendEmail(email, token) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "andyren33@gmail.com",
      to: email,
      subject: "Verify Your Swingspace Account",
      html: `${process.env.BASE_URL}/verify/${token}`,
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.log("Email not sent");
  }
}

module.exports = { sendEmail };
