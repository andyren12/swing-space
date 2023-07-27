const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stripeCustomerSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

const StripeCustomerAcc = mongoose.model(
  "Stripe_customer_acct",
  stripeCustomerSchema
);

module.exports = StripeCustomerAcc;
