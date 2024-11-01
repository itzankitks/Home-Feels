import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import connectToMongoDB from "./services/databaseService.js";
import authRoute from "./routes/authRoute.js"
import usersRoute from "./routes/usersRoute.js"
import hotelsRoute from "./routes/hotelsRoute.js"
import roomsRoute from "./routes/roomsRoute.js"

const app = express();
dotenv.config();

connectToMongoDB(process.env.MONGODB_URL);

app.use(express.json())
app.use(cookieParser());
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use((err, req, res, next) => {
    const errStatus = err.status || 500
    const errMessage = err.message || "Something Went Wrong"
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack
    })
})

app.get("/", (req, res) => {
    res.send("Hello");
});
app.get("/register", (req, res) => {
    res.send("Register Enfpoint");
});

app.listen(8000, () => {
    console.log("Server started at Port 8000");
});
