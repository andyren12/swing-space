const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSessionSchema = new Schema(
  {
    user: {
      type: String,
      ref: "User",
    },
    video: {
      type: String,
      ref: "Upload",
    },
    watched: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const VideoSession = mongoose.model("VideoSession", videoSessionSchema);
module.exports = VideoSession;
