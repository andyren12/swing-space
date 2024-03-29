const express = require("express");
const router = express.Router();

const SubscriptionController = require("../controllers/SubscriptionController");

router.post("/add", SubscriptionController.subscribe);
router.delete("/remove", SubscriptionController.unsubscribe);
router.get("/get", SubscriptionController.get);
router.post("/create", SubscriptionController.createSubscription);

module.exports = router;
