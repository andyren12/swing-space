const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
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
    role: {
      type: String,
      enum: ["student", "coach", "admin"],
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationExpires: {
      type: Date,
      default: new Date(Date.now() + 60 * 60 * 1000),
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.index(
  { verificationExpires: 1 },
  {
    expireAfterSeconds: 0,
    partialFilterExpression: { verified: false },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
