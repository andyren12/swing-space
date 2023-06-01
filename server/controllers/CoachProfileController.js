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

const createCourse = async (req, res) => {
  // Extract the coach ID and course name from the request body
  const { coachID, courseName } = req.body;
  console.log(req.body);
  if (!coachID || !courseName) {
    return res.status(400).json({ message: "Missing coach ID or course name" });
  }

  try {
    // Find the coach profile using the coach ID
    const profile = await CoachProfile.findOne({ coachID });

    if (!profile) {
      return res.status(404).json({ message: "Coach not found" });
    }

    // Add the new course to the courses array
    profile.courses.push({ name: courseName });

    // Save the updated profile
    await profile.save();

    // Send the updated courses array as the response
    res.json(profile.courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const upload = async (req, res) => {
  const file = req.file;
  const result = await s3Uploadv3(file);
  console.log(req.body);
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
            "i.name": req.body.courseName,
          },
          {
            "j.sectionTitle": req.body.sectionName,
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

const getCoursesByCoachID = async (req, res) => {
  const { coachID } = req.query;

  if (!coachID) {
    return res.status(400).json({ message: "Missing coach ID" });
  }

  try {
    // Find the coach profile using the coach ID
    const profile = await CoachProfile.findOne({ coachID });

    if (!profile) {
      return res.status(404).json({ message: "Coach not found" });
    }

    // Send the courses of the coach as the response
    res.json(profile.courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getVideosByCoachIDAndCourseName = async (req, res) => {
  // Extract the coach ID and course name from the query parameters
  const { coachID, courseName } = req.query;

  if (!coachID || !courseName) {
    return res.status(400).json({ message: "Missing coach ID or course name" });
  }

  try {
    // Find the coach profile using the coach ID
    const profile = await CoachProfile.findOne({ coachID });

    if (!profile) {
      return res.status(404).json({ message: "Coach not found" });
    }

    // Find the course using the course name
    const course = profile.courses.find((course) => course.name === courseName);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Map through sections to collect all videos
    let allVideos = [];
    course.sections.forEach((section) => {
      allVideos = allVideos.concat(section.videos);
    });

    // Send the videos of the course as the response
    res.json(allVideos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  upload,
  createProfile,
  getCoursesByCoachID,
  getVideosByCoachIDAndCourseName,
  createCourse,
};
