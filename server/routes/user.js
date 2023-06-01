const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/verify/:token", UserController.verify);
router.post("/subscribe/:id", UserController.subscribe);
router.post("/unsubscribe/:id", UserController.unsubscribe);
router.get("/get/:id", UserController.getAccount);

module.exports = router;
