const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const email = require("../utils/email");
const dotenv = require("dotenv");
dotenv.config();

const register = (req, res) => {
  bcrypt.hash(req.body.password, 10, async function (err, hashedPass) {
    try {
      let exists = await User.findOne({
        email: req.body.email,
      });

      if (exists) {
        res.json({
          message: "User already exists",
        });
      } else {
        let user = await new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          role: req.body.role,
          password: hashedPass,
        }).save();

        if (user) {
          const emailToken = jwt.sign(
            {
              id: user._id,
              email: user.email,
            },
            process.env.EMAIL_TOKEN_SECRET,
            { expiresIn: "1h" }
          );
          email.sendEmail(req.body.email, emailToken);

          res.json({
            message: "An email has been sent to your account for verification!",
          });
        }
      }
    } catch (err) {
      res.json({
        message: "An error occured!",
      });
    }
  });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      email: username,
    });

    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign(
            { email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
            }
          );
          let refreshtoken = jwt.sign(
            { email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
          );
          res.json({
            message: "Login Successful!",
            user,
            token,
            refreshtoken,
          });
        } else {
          res.json({
            message: "Password is incorrect!",
          });
        }
      });
    } else {
      res.json({
        message: "No user found!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const refreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    function (err, decoded) {
      if (err) {
        res.status(400).json({
          err,
        });
      } else {
        let token = jwt.sign(
          { name: decoded.name },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "60s",
          }
        );
        let refreshToken = req.body.refreshToken;
        res.status(200).json({
          message: "Token refreshed successfully!",
          token,
          refreshToken,
        });
      }
    }
  );
};

const verify = async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.body.emailToken,
      process.env.EMAIL_TOKEN_SECRET
    );
    if (decoded) {
      let user = await User.findOneAndUpdate(
        { _id: decoded.id },
        { verified: true }
      );

      if (user) {
        res.json("User found and updated");
      }
    } else {
      res.json({
        message: "User not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  verify,
};
