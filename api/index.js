import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./services/databaseService.js";
import authRoute from "./routes/authRoute.js";
import usersRoute from "./routes/usersRoute.js";
import hotelsRoute from "./routes/hotelsRoute.js";
import roomsRoute from "./routes/roomsRoute.js";

const app = express();
dotenv.config();

// this initializes the database connection
connectToMongoDB(process.env.MONGODB_URL);

// middleware
app.use(express.json());
app.use(cookieParser());

// middleware and routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// this is a middleware to handle errors
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something Went Wrong";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(8000, () => {
  console.log("Server started at Port 8000");
});
