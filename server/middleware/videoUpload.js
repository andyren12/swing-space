const multer = require("multer");
const uuid = require("uuid").v4;

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const { originalname } = file;
//     cb(null, `${uuid()}-${originalname}`);
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "video") {
    cb(null, true);
  } else {
    cb(new Error("file is not right"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5000000000 },
});

module.exports = upload;
