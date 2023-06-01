const multer = require("multer");
const CoachProfile = require("../models/CoachProfile");
const { s3Uploadv3 } = require("../utils/s3Service");
const User = require("../models/User");

// const createCourse = async (req, res) => {
//   const title = req.body.title;
//   try {
//     const course = await
//   }
// };

const createProfile = async (req, res) => {
  try {
    const exists = await CoachProfile.findOne({
      coachID: req.body.id,
    });

    if (exists) {
      res.json({
        message: "User already exists",
      });
    } else {
      const profile = await new CoachProfile({
        coachID: req.body.id,
      }).save();

      if (profile) {
        res.json({
          message: "success",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const upload = async (req, res) => {
  const file = req.file;
  const result = await s3Uploadv3(file);
  console.log(req.body.id);
  try {
    const profile = await CoachProfile.updateOne(
      {
        coachID: req.body.id,
      },
      {
        $push: {
          "courses.$[i].sections.$[j].videos": {
            videoTitle: req.body.name,
            videoPath: result.name,
          },
        },
      },
      {
        arrayFilters: [
          {
            "i.name": "Course 1",
          },
          {
            "j.sectionTitle": "Section 1",
          },
        ],
      }
    );

    if (profile) {
      res.json({
        message: "Success",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  upload,
  createProfile,
};
