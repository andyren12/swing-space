const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coachSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    subscriptions: {
      type: Array,
    },
    students: {
      type: Array,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const Coach = mongoose.model("Coach", coachSchema);
module.exports = Coach;
