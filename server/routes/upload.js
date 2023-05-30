const express = require("express");
const router = express.Router();
const upload = require("../middleware/videoUpload");

const UploadController = require("../controllers/UploadController");

router.post("/file", upload.single("file"), UploadController.upload);

module.exports = router;
