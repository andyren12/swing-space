const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uploadSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Upload = mongoose.model("Upload", uploadSchema);
module.exports = Upload;
