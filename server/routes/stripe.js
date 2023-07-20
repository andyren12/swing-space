const express = require("express");
const router = express.Router();

const StripeController = require("../controllers/StripeController");

router.delete("/delete", StripeController.deleteStripeAccount);
router.post("/check", StripeController.checkRequirements);
router.put("/update/:accountId", StripeController.updateAccount);
router.post("/checkout", StripeController.checkout);

module.exports = router;
