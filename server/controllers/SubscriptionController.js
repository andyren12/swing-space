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

const getUserSubscriptions = async (req, res) => {
  const userID = req.params.id;
  const allSubscriptions = await Subscription.find({ 
    studentId : {
      $all : userID
    }
  })
  res.send(allSubscriptions)
}

const getCoachSubscribers = async (req, res) => {
  const coachID = req.params.id;
  const allSubscribers = await Subscription.find({
    coachId: {
      $all : coachID
    }
  })
  res.send(allSubscribers)
}

const sendMessage = async(req, res) => {
  const subID = req.body.id
  const sender = req.body.sender
  const content = req.body.content
  const date = Date.now()

  console.log(sender)
  console.log(content)
  console.log(subID)

  const subscription = await Subscription.findById(subID)

  console.log(subscription.studentId)

  if(subscription) {
    await Subscription.updateOne(
      { _id: subID },
      {
        $push: {
          message_history : {
            sender: sender,
            content: content,
            send_date: date
          }
        },
        $currentDate: { lastUpdated: true }
      }
    )
    res.status(200).send({
      subscription
    })
  }
}


module.exports = {
  subscribe,
  unsubscribe,
  get,
  getUserSubscriptions,
  getCoachSubscribers,
  sendMessage
};
