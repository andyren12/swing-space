const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const StripeController = require("../controllers/StripeController");

router.delete(
  "/delete",
  bodyParser.json(),
  StripeController.deleteStripeAccount
);
router.post("/check", bodyParser.json(), StripeController.checkRequirements);
router.put(
  "/update/:accountId",
  bodyParser.json(),
  StripeController.updateAccount
);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  StripeController.webhook
);

module.exports = router;
