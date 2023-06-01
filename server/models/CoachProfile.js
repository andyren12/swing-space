// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const coachProfileSchema = new Schema(
//   {
//     coachID: {
//       type: String,
//       // required: true,
//     },
//     courses: [
//       {
//         name: {
//           type: String,
//           default: "Course 1",
//         },
//         sections: [
//           {
//             sectionTitle: {
//               type: String,
//               default: "Section 1",
//             },
//             videos: [
//               {
//                 videoTitle: {
//                   type: String,
//                   // required: true,
//                 },
//                 videoPath: {
//                   type: String,
//                   // required: true,
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const CoachProfile = mongoose.model("CoachProfile", coachProfileSchema);
// module.exports = CoachProfile;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coachProfileSchema = new Schema(
  {
    coachID: {
      type: String,
      // required: true,
    },
    courses: {
      type: [
        {
          name: {
            type: String,
          },
          sections: [
            {
              sectionTitle: {
                type: String,
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
      default: [
        {
          name: "Course 1",
          sections: [
            {
              sectionTitle: "Section 1",
              videos: [],
            },
          ],
        },
      ], // This will be the default value for courses
    },
  },
  { timestamps: true }
);

const CoachProfile = mongoose.model("CoachProfile", coachProfileSchema);
module.exports = CoachProfile;
