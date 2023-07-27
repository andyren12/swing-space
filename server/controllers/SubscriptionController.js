const Subscription = require("../models/Subscription");
const User = require("../models/User");
const StripeCustomerAcc = require("../models/StripeCustomerAcc");
const CoachProfile = require("../models/CoachProfile");
const StripeConnAcc = require("../models/StripeConnAcc");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const subscribe = async (req, res) => {
  try {
    const { studentId, coachId, priceId, connectedAcctId } = req.body;

    if (studentId !== coachId) {
      const exists = await Subscription.findOne({
        studentId,
        coachId,
      });

      if (exists) {
        res.json({
          message: "Already subscribed",
        });
      }
      const student = await User.findById(studentId);
      const coach = await User.findById(coachId);
      if (student && coach) {
        if (coach.role === "coach") {
          const session = await stripe.checkout.sessions.create(
            {
              payment_method_types: ["card"],
              line_items: [
                {
                  price: priceId,
                  quantity: 1,
                },
              ],
              mode: "subscription",
              success_url: "http://localhost:3000/dashboard",
              cancel_url: "http://localhost:3000",
              metadata: {
                studentId,
                coachId,
              },
            },
            {
              stripeAccount: connectedAcctId,
            }
          );
          if (session) {
            res.json({
              session,
            });
          } else {
            res.json({
              message: "Failed",
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

const createSubscription = async (req, res) => {
  try {
    const { id, name, cost } = req.body;

    const coach = await CoachProfile.findOne({
      coachID: id,
    });

    if (coach) {
      const product = await stripe.products.create(
        {
          name,
        },
        {
          stripeAccount: coach.stripeId,
        }
      );

      if (product) {
        const price = await stripe.prices.create(
          {
            unit_amount: cost,
            currency: "usd",
            recurring: { interval: "month" },
            product: product.id,
          },
          {
            stripeAccount: coach.stripeId,
          }
        );

        if (price) {
          const subscription = await CoachProfile.findOneAndUpdate(
            { coachID: id },
            {
              $push: {
                subscriptions: {
                  productID: product.id,
                  priceID: price.id,
                  name,
                },
              },
            }
          );

          if (subscription) {
            res.json({
              message: "Subscription created",
            });
          } else {
            res.json({
              message: "No subscription",
            });
          }
        } else {
          res.json({
            message: "No price",
          });
        }
      } else {
        res.json({
          message: "No product",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  subscribe,
  unsubscribe,
  get,
  createSubscription,
};
