const multer = require("multer");
const CoachProfile = require("../models/CoachProfile");
const { s3Uploadv3 } = require("../utils/s3Service");
const User = require("../models/User");

//Create Course

const createCourse = async (req, res) => {
  // Extract the coach ID and course name from the request body
  const { coachID, courseName } = req.body;
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
    profile.courses.push({ coachID: coachID, name: courseName });

    // Save the updated profile
    await profile.save();

    // Send the updated courses array as the response
    res.json(profile.courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createNewSection = async (req, res) => {
  const { coachID, courseID, sectionTitle } = req.body;
  try {
    const profile = await CoachProfile.findOne({ coachID });
    if (!profile) {
      return res.status(404).json({ message: "Coach not found" });
    }

    const course = profile.courses.find((course) => course.name === courseID);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.sections.push({ sectionTitle });
    await profile.save();
    res.status(200).json({ message: "Section successfully added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Upload Video

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

//Get a Coaches Courses

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

//Get all Videos of a Course

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

const getCourseByCourseID = async (req, res) => {
  const { courseID } = req.query;

  try {
    const coachProfile = await CoachProfile.findOne({
      "courses._id": courseID,
    }).select({ courses: { $elemMatch: { _id: courseID } } });

    if (
      !coachProfile ||
      !coachProfile.courses ||
      coachProfile.courses.length === 0
    ) {
      return res.status(404).json({ message: "Course not found" });
    }

    const course = coachProfile.courses[0];
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  const { coachID } = req.query;

  try {
    const coachProfile = await CoachProfile.findOne({
      coachID,
    });

    if (coachProfile) {
      res.json({
        coachProfile,
      });
    } else {
      res.json({
        message: "not found",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  upload,
  getCoursesByCoachID,
  getVideosByCoachIDAndCourseName,
  createCourse,
  getCourseByCourseID,
  createNewSection,
  getProfile,
};
