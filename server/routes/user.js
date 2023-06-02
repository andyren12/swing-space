const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/verify/:token", UserController.verify);
router.post("/subscribe/:id", UserController.subscribe);
router.post("/getCoachID", UserController.getCoachIDArray);
router.put("/putWatchedVideoSession", UserController.putWatchedVideo);
router.get(
  "/getWatchedVideosByCourseAndCoach",
  UserController.getVideosWatchedByCoachIDAndCoachName
);

module.exports = router;
