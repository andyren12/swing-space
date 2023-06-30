const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSessionSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
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
