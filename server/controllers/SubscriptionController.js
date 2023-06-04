const Subscription = require("../models/Subscription");
const User = require("../models/User");

const subscribe = async (req, res) => {
  try {
    const { studentId, coachId } = req.body;

    if (studentId !== coachId) {
      const exists = await Subscription.findOne({
        studentId,
        coachId,
      });

      const student = await User.findById(studentId);
      const coach = await User.findById(coachId);

      if (exists) {
        res.json({
          message: "Already subscribed",
        });
      } else {
        if (student && coach) {
          if (coach.role === "coach") {
            const subscription = await new Subscription({
              studentId,
              coachId,
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
    const { studentId, coachId } = req.query;

    if (coachId !== studentId) {
      const student = await User.findById(studentId);
      const coach = await User.findById(coachId);

      if (student && coach) {
        if (coach.role === "coach") {
          const subscription = await Subscription.findOneAndDelete({
            studentId,
            coachId,
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

const get = async (req, res) => {
  const { coachId, studentId } = req.query;
  const subscription = await Subscription.findOne({
    coachId,
    studentId,
  });

  if (subscription) {
    res.json({
      subscription,
    });
  } else {
    res.json({
      message: "No subscription found",
    });
  }
};

module.exports = {
  subscribe,
  unsubscribe,
  get,
};
