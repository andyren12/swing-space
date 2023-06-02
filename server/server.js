const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

const UserRoute = require("./routes/user");
const UploadRoute = require("./routes/upload");
const CoachProfileRoute = require("./routes/coachProfile");
const SubscriptionRoute = require("./routes/subscription");

mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Database connection established!");
});

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api", UserRoute);
app.use("/upload", UploadRoute);
app.use("/coach-dashboard", CoachProfileRoute);
app.use("/subscribe", SubscriptionRoute);
