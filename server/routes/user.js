const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/verify/:token", UserController.verify);
router.get("/account/:id", UserController.getAccount);
router.get("/getCoaches", UserController.getCoaches);
router.put("/putWatchedVideoSession", UserController.putWatchedVideo);
router.get(
  "/getWatchedVideosByUserAndCourse",
  UserController.getWatchedVideosByUserAndCourse
);
router.get("/search", UserController.searchCoaches);

module.exports = router;
