const multer = require("multer");
const Upload = require("../models/Upload");
const { s3Uploadv3 } = require("../utils/s3Service");

const upload = async (req, res) => {
  const file = req.file;
  try {
    let upload = await new Upload({
      title: req.body.name,
      path: "path",
    }).save();
    console.log(file);
    const result = await s3Uploadv3(file);
    res.json({ status: "success", result });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  upload,
};
