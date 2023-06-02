const Subscription = require("../models/Subscription");
const User = require("../models/User");

const subscribe = async (req, res) => {
  try {
    if (req.body.id !== req.params.id) {
      const exists = await Subscription.findOne({
        studentID: req.body.id,
        coachID: req.params.id,
      });

      const student = await User.findById(req.body.id);
      const coach = await User.findById(req.params.id);

      if (exists) {
        res.json({
          message: "Already subscribed",
        });
      } else {
        if (student && coach) {
          if (coach.role === "coach") {
            const subscription = await new Subscription({
              studentID: req.body.id,
              coachID: req.params.id,
            }).save();

            if (subscription) {
              res.json({
                message: "Subscribed successfully",
              });
            } else {
              res.json({
                message: "An error has occurred",
              });
            }
          } else {
            res.json({
              message: "Can't subscribe to student",
            });
          }
        } else {
          res.json({
            message: "Student or coach not found",
          });
        }
      }
    } else {
      res.json({
        message: "Can't subscribe to self",
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

      if (student && coach) {
        if (coach.role === "coach") {
          const subscription = await Subscription.findOneAndDelete({
            studentID: req.body.id,
            coachID: req.params.id,
          });
          if (subscription) {
            res.json({
              message: "Unsubscribed successfully",
            });
          } else {
            res.json({
              message: "No subscription found",
            });
          }
        } else {
          res.json({
            message: "Can't unsubscribe to student",
          });
        }
      } else {
        res.json({
          message: "Student or coach not found",
        });
      }
    } else {
      res.json({
        message: "Can't unsubscribe to self",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  subscribe,
  unsubscribe,
};
