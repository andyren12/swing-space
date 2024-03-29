const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
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
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const UserRoute = require("./routes/user");
const CoachProfileRoute = require("./routes/coachProfile");
const SubscriptionRoute = require("./routes/subscription");
const StripeRoute = require("./routes/stripe");

app.use("/api", bodyParser.json(), UserRoute);
app.use("/coachprofile", bodyParser.json(), CoachProfileRoute);
app.use("/subscribe", bodyParser.json(), SubscriptionRoute);
app.use("/stripe", StripeRoute);
