const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const email = require("../utils/email");
const Upload = require("../models/Upload");

const register = (req, res) => {
  bcrypt.hash(req.body.password, 10, async function (err, hashedPass) {
    try {
      const exists = await User.findOne({
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
          password: hashedPass,
          role: req.body.role,
        }).save();

        if (user) {
          const emailToken = jwt.sign(
            {
              email: user.email,
              role: req.body.role,
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

const subscribe = async (req, res) => {
  try {
    if (req.body.id !== req.params.id) {
      const student = await User.findById(req.body.id);
      const coach = await User.findById(req.params.id);

      if (coach.role !== "coach") {
        res.json({
          message: "Not a coach",
        });
      } else {
        if (student && coach) {
          console.log(student.subscriptions);
          const subscribes = student.subscriptions.filter((sub) => {
            return sub.id.equals(coach._id);
          });

          // if (subscribes) {
          //   res.json({
          //     message: "You already subscribe",
          //   });
          // } else
          {
            const studentUpdate = await User.findByIdAndUpdate(student._id, {
              $push: {
                subscriptions: {
                  id: coach._id,
                },
              },
            });
            const coachUpdate = await User.findByIdAndUpdate(coach._id, {
              $push: {
                students: {
                  id: student._id,
                },
              },
            });
            if (studentUpdate && coachUpdate) {
              res.json({
                message: "Subscribed successfully",
              });
            } else {
              res.json({
                message: "Could not subscribe",
              });
            }
          }
        } else {
          res.json({
            message: "Coach not found",
          });
        }
      }
    } else {
      res.json({
        message: "Cannot subscribe to self",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const unsubscribe = async (req, res) => {
  try {
    if (req.body.id !== req.params.id) {
      const student = await User.findById(req.body.id);
      const coach = await User.findById(req.params.id);

      if (coach.role !== "coach") {
        res.json({
          message: "Not a coach",
        });
      } else {
        if (student && coach) {
          const subscribes = student.subscriptions.filter((sub) => {
            return sub.id.equals(coach._id);
          });

          if (!subscribes) {
            res.json({
              message: "You don't subscribe",
            });
          } else {
            const studentUpdate = await User.findByIdAndUpdate(student._id, {
              $pull: {
                subscriptions: {
                  id: coach._id,
                },
              },
            });
            const coachUpdate = await User.findByIdAndUpdate(coach._id, {
              $pull: {
                students: {
                  id: student._id,
                },
              },
            });
            if (studentUpdate && coachUpdate) {
              res.json({
                message: "Unsubscribed successfully",
              });
            } else {
              res.json({
                message: "Could not unsubscribe",
              });
            }
          }
        } else {
          res.json({
            message: "Coach not found",
          });
        }
      }
    } else {
      res.json({
        message: "Cannot unsubscribe to self",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const getAccount = async (req, res) => {
  try {
    console.log(req.params.id);
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

module.exports = {
  register,
  login,
  verify,
  subscribe,
  unsubscribe,
  getAccount,
};
