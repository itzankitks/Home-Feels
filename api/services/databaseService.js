import mongoose from "mongoose";

async function connectToMongoDB(url) {
  console.log(url);
  return mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(`Error while connecting: ${err}`));
}

export default connectToMongoDB;

// async function connectToMongoDB(url) {
//     try {
//         await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log("MongoDB connected");

//         mongoose.connection.on("disconnected", () => {
//             console.log("MongoDB Disconnected");
//         });

//         mongoose.connection.on("connected", () => {
//             console.log("MongoDB Reconnected");
//         });
//     } catch (err) {
//         console.log(`Error while connecting: ${err.message}`);
//     }
// }
