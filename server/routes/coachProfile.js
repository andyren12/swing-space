const express = require("express");
const router = express.Router();
const upload = require("../middleware/videoUpload");

const CoachProfileController = require("../controllers/CoachProfileController");

router.post("/create-profile", CoachProfileController.createProfile);
router.post(
  "/upload-video",
  upload.single("file"),
  CoachProfileController.upload
);
router.post("/create-course", CoachProfileController.createCourse);
router.post("/create-section", CoachProfileController.createNewSection);
router.get("/get-courses", CoachProfileController.getCoursesByCoachID);
router.get(
  "/get-videos",
  CoachProfileController.getVideosByCoachIDAndCourseName
);
router.get("/get-course", CoachProfileController.getCourseByCourseID);

module.exports = router;
