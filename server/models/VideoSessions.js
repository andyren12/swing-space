const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSessionSchema = new Schema(
  {
    user: {
      type: String,
    },
    video: {
      type: String,
    },
    courseId: {
      type: String,
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
