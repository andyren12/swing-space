const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;
const Subscription = require("../models/Subscription");

const webhook = (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        // Here you can check the payment status
        if (session.payment_status === "paid") {
          // Payment succeeded
          handleSubscribe(session);
        } else {
          // Payment failed
          console.log(`Payment for session ${session.id} failed`);
        }
        break;
    }
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return;
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};

const handleSubscribe = async (session) => {
  try {
    const { studentId, coachId } = session.metadata;
    const subscriptionId = session.subscription;

    await new Subscription({
      studentId,
      coachId,
      subscriptionId,
    }).save();
  } catch (err) {
    console.log(err);
  }
};

const deleteStripeAccount = async (req, res) => {
  try {
    const { id } = req.query;
    const deleted = await stripe.accounts.del(id);
    if (deleted) {
      res.json({
        message: "Success",
      });
    }
  } catch (err) {
    res.json(err);
  }
};

const checkRequirements = async (req, res) => {
  const account = await stripe.accounts.retrieve(req.body.id);
  res.json(account.requirements);
};

const updateAccount = async (req, res) => {
  try {
    const accountId = req.params.accountId;

    let updatedInfo = {};

    if (req.body.individual) {
      updatedInfo.individual = req.body.individual;
    }

    if (req.body.business_profile) {
      updatedInfo.business_profile = req.body.business_profile;
    }

    if (req.body.external_account) {
      updatedInfo.external_account = req.body.external_account;
    }

    if (req.body.tos_acceptance) {
      updatedInfo.tos_acceptance = req.body.tos_acceptance;
    }

    const account = await stripe.accounts.update(accountId, updatedInfo);

    if (account) {
      res.json({
        message: "Success",
      });
    } else {
      res.json({
        message: "Failed",
      });
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  webhook,
  deleteStripeAccount,
  checkRequirements,
  updateAccount,
};
