import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelById,
  getAllHotel,
  getHotelCountByCity,
  getHotelCountByType,
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

export default router;
