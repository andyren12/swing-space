const express = require("express");
const router = express.Router();
// const upload = require("../middleware/coachProfile");

const CoachProfileController = require("../controllers/CoachProfileController");

router.post("/create-profile", CoachProfileController.createProfile);

module.exports = router;
