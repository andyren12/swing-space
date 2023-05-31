const multer = require("multer");
const Upload = require("../models/Upload");
const { s3Uploadv3 } = require("../utils/s3Service");
const User = require("../models/User");

const upload = async (req, res) => {
  const file = req.file;
  const result = await s3Uploadv3(file);
  try {
    const upload = await new Upload({
      title: req.body.name,
      path: result.name,
    }).save();
    console.log(file);

    if (upload) {
      const user = await User.findOneAndUpdate({
        email: req.body.email,
        $push: {
          subscriptions: upload._id.toString(),
        },
      });

      if (user) {
        res.json({
          message: "success",
          result,
        });
      } else {
        res.json({
          message: "failed",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  upload,
};
