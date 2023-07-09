const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

const UserRoute = require("./routes/user");
const CoachProfileRoute = require("./routes/coachProfile");
const SubscriptionRoute = require("./routes/subscription");

mongoose.connect(`${process.env.MONGO_URL}`, {
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
app.use("/coachprofile", CoachProfileRoute);
app.use("/subscribe", SubscriptionRoute);



//----- SOCKET -----//

const httpServer = require("http").createServer(app);
//no idea if this is right
httpServer.listen(3002, () => {
  console.log(`http is running on port 3002`);
});
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const {onConnect} = require("./utils/socket")

// middleware auth
io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  const id = socket.handshake.auth.user_id
  if (!username || !id) {
    return next(new Error("invalid user or id"));
  }
  socket.username = username;
  socket.id = id;
  next();
});

io.on("connection", onConnect(io))
