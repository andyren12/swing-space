const express = require("express");
const router = express.Router();
const upload = require("../middleware/videoUpload");

const CoachProfileController = require("../controllers/CoachProfileController");

router.post(
  "/upload/video",
  upload.single("file"),
  CoachProfileController.upload
);
router.post("/create/course", CoachProfileController.createCourse);
router.post("/create/section", CoachProfileController.createNewSection);
router.get("/courses", CoachProfileController.getCoursesByCoachID);
router.get("/videos", CoachProfileController.getVideosByCoachIDAndCourseName);
router.get("/course", CoachProfileController.getCourseByCourseID);
router.get("/course2", CoachProfileController.getCourseByCourseName);

module.exports = router;
