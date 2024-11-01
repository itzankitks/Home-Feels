import express from "express";
import { createRoom, updateRoom, deleteRoom, getRoomById, getAllRoom } from "../controllers/roomsController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Create
router.post("/:hotelId", verifyAdmin, createRoom);

// Update
router.put("/:id", verifyAdmin, updateRoom)

// Delete
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom)

// Get
router.get("/:id", getRoomById)

// Get All
router.get("/", getAllRoom)

export default router;