import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelById,
  getAllHotel,
  getHotelCountByCity,
  getHotelCountByType,
  getHotelRooms,
} from "../controllers/hotelsController.js";
import Hotel from "../models/hotelSchema.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Create
router.post("/", verifyAdmin, createHotel);

// Update
router.put("/:id", verifyAdmin, updateHotel);

// Delete
router.delete("/:id", verifyAdmin, deleteHotel);

// Get
router.get("/find/:id", getHotelById);

// Get All
router.get("/", getAllHotel);

router.get("/countByCity", getHotelCountByCity);
router.get("/countByType", getHotelCountByType);

// Get hotel rooms by hotel ID
router.get("/room/:id", getHotelRooms);

// Get all hotels _id
// router.get("/all-hotel-ids", async (req, res, next) => {
//   try {
//     const hotels = await Hotel.find({}, "_id");
//     res.status(200).json({ count: hotels.length, hotels });
//   } catch (err) {
//     next(err);
//   }
// });

// Route to clear rooms array for all hotels
// router.put("/hotel-rooms/clear-rooms", clearAllHotelRooms);

export default router;
