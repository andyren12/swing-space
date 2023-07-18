const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stripeConnAccSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

const StripeConnAcc = mongoose.model(
  "Stripe_connected_accts",
  stripeConnAccSchema
);

module.exports = StripeConnAcc;
