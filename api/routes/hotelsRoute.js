import express from "express";
import { createHotel, updateHotel, deleteHotel, getHotelById, getAllHotel } from "../controllers/hotelsController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Create
router.post("/", verifyAdmin, createHotel);

// Update
router.put("/:id", verifyAdmin, updateHotel)

// Delete
router.delete("/:id", verifyAdmin, deleteHotel)

// Get
router.get("/:id", getHotelById)

// Get All
router.get("/", getAllHotel)

export default router;