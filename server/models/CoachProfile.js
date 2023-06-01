const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coachProfileSchema = new Schema(
  {
    coachID: {
      type: String,
      // required: true,
    },
    courses: [
      {
        name: {
          type: String,
          required: true,
        },
        sections: [
          {
            sectionTitle: {
              type: String,
              // default: "Section 1",
            },
            videos: [
              {
                videoTitle: {
                  type: String,
                  // required: true,
                },
                videoPath: {
                  type: String,
                  // required: true,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const CoachProfile = mongoose.model("CoachProfile", coachProfileSchema);
module.exports = CoachProfile;
