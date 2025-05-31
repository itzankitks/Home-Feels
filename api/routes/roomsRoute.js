import express from "express";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomById,
  getAllRoom,
  updateRoomAvailability,
} from "../controllers/roomsController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Create
router.post("/:hotelId", verifyAdmin, createRoom);

// Bulk Create Rooms
// router.post("/create-bulk/bulk", bulkCreateRooms);

// Update
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

// Delete
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

// Get
router.get("/:id", getRoomById);

// Get All
router.get("/", getAllRoom);

export default router;
