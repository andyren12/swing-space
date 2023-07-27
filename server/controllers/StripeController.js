const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
  deleteStripeAccount,
  checkRequirements,
  updateAccount,
};
