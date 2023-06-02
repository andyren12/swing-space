const express = require("express");
const router = express.Router();

const SubscriptionController = require("../controllers/SubscriptionController");

router.post("/add/:id", SubscriptionController.subscribe);
router.post("/remove/:id", SubscriptionController.unsubscribe);

module.exports = router;
