const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const email = require("../utils/email");
const Upload = require("../models/Upload");
const CoachProfile = require("../models/CoachProfile");
const VideoSession = require("../models/VideoSessions");
const StripeConnAcc = require("../models/StripeConnAcc");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const register = (req, res) => {
  bcrypt.hash(req.body.password, 10, async function (err, hashedPass) {
    try {
      const { firstName, lastName, email, role } = req.body;
      const exists = await User.findOne({
        email,
      });

      if (exists) {
        res.json({
          message: "User already exists",
        });
      } else {
        let user = await new User({
          firstName,
          lastName,
          email,
          password: hashedPass,
          role,
          verified: true,
        }).save();

        if (user) {
          // const emailToken = jwt.sign(
          //   {
          //     email: user.email,
          //     role: req.body.role,
          //   },
          //   process.env.EMAIL_TOKEN_SECRET,
          //   { expiresIn: "1h" }
          // );
          // email.sendEmail(req.body.email, emailToken);

          if (user.role === "coach") {
            const account = await stripe.accounts.create({
              type: "express",
              email: user.email,
              capabilities: {
                card_payments: {
                  requested: true,
                },
                transfers: {
                  requested: true,
                },
              },
              business_type: "individual",
            });

            await new CoachProfile({
              coachID: user._id.toString(),
              stripeId: account.id,
            }).save();

            const accountLink = await stripe.accountLinks.create({
              account: account.id, //id is returned in previous step
              refresh_url: "https://localhost:3000/coachsignup", //when onbaording fails, should trigger method to call account links and redirect user to onboarding
              return_url: "https://localhost:3000/dashboard", //redirects when user completes connect onboarding flow
              type: "account_onboarding",
            });
            //if redirected to return_url later check charges_enabled to see if fully onboarded, if not provide UI prompts to allow continue later

            if (accountLink) {
              res.json({
                url: accountLink.url,
              });
            } else {
              res.json({
                message: "Error creating accounts",
              });
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          // if (user.verified === false) {
          //   res.json({
          //     message: "User is not verified",
          //   });
          // } else {

          res.json({
            user,
          });
          // }
        } else {
          res.json({
            message: "Password is incorrect!",
          });
        }
        if (err) {
          res.json({
            error: err,
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

const verify = async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.params.token,
      process.env.EMAIL_TOKEN_SECRET
    );
    if (decoded) {
      let user = await User.findOneAndUpdate(
        { email: decoded.email },
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

const getAccount = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user)
      res.json({
        message: "Get successful",
        user,
      });
  } catch (err) {
    console.log(err);
  }
};

const getCoaches = async (req, res) => {
  try {
    const coaches = await User.find({
      role: "coach",
    });

    if (coaches) {
      res.json({
        coaches,
        message: "Success",
      });
    } else {
      res.json({
        message: "No coaches found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const putWatchedVideo = async (req, res) => {
  const { userID, videoID, courseID } = req.body;

  try {
    let userVideo = await VideoSession.findOne({
      user: userID,
      video: videoID,
      courseId: courseID,
    });

    if (!userVideo) {
      userVideo = new VideoSession({
        user: userID,
        video: videoID,
        courseId: courseID,
        watched: true,
      });
    } else {
      userVideo.watched = true;
    }

    await userVideo.save();
    res.json(userVideo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getWatchedVideosByUserAndCourse = async (req, res) => {
  const { userId, courseId } = req.query;
  try {
    // Find the VideoSession documents where user is userId, coachProfile is coachProfileId, courseId matches, and watched is true
    const watchedSessions = await VideoSession.find({
      user: userId,
      courseId: courseId,
      watched: true,
    }).populate("video");

    if (!watchedSessions) {
      return res
        .status(404)
        .json({ msg: "No videos found for this user in this course" });
    }

    // Extract just the video data from each session
    const watchedVideos = watchedSessions.map((session) => session.video);

    res.json(watchedVideos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const searchCoaches = async (req, res) => {
  try {
    const search = req.query.search;
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort || "firstName";

    const users = await User.find({
      $and: [
        {
          $or: [
            { firstName: { $regex: `^${search}`, $options: "i" } },
            { lastName: { $regex: `^${search}`, $options: "i" } },
          ],
        },
        {
          role: "coach",
        },
      ],
    });

    if (users)
      res.json({
        users,
      });
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  register,
  login,
  verify,
  getAccount,
  getCoaches,
  putWatchedVideo,
  getWatchedVideosByUserAndCourse,
  searchCoaches,
};
