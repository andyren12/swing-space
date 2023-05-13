const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

async function sendEmail(email, token) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "andyren33@gmail.com",
        pass: "jzwrhqnegmfhqcrm",
      },
    });

    await transporter.sendMail({
      from: "andyren33@gmail.com",
      to: email,
      subject: "Email Verification",
      html: `http://localhost:3000/verify/${token}`,
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.log("Email not sent");
  }
}

module.exports = { sendEmail };
