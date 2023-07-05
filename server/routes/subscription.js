const express = require("express");
const router = express.Router();

const SubscriptionController = require("../controllers/SubscriptionController");

router.post("/add", SubscriptionController.subscribe);
router.delete("/remove", SubscriptionController.unsubscribe);
router.get("/get", SubscriptionController.get);
router.get("/getSubscriptions/:id", SubscriptionController.getUserSubscriptions);
router.get("/getSubscribers/:id", SubscriptionController.getCoachSubscribers);
router.put("/addMessage", SubscriptionController.sendMessage)

module.exports = router;
