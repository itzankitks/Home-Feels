import Room from "../models/roomSchema.js";
import Hotel from "../models/hotelSchema.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      {
        "roomNumbers._id": req.params.id,
      },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room records are deleted");
  } catch (err) {
    next(err);
  }
};

export const getRoomById = async (req, res, next) => {
  try {
    const foundRoom = await Room.findById(req.params.id);
    res.status(200).json(foundRoom);
  } catch (err) {
    next(err);
  }
};

export const getAllRoom = async (req, res, next) => {
  try {
    const foundRooms = await Room.find();
    res.status(200).json(foundRooms);
  } catch (err) {
    next(err);
  }
};

// export const bulkCreateRooms = async (req, res, next) => {
//   const roomList = req.body;

//   if (!Array.isArray(roomList)) {
//     return res.status(400).json({ message: "Expected an array of rooms." });
//   }

//   try {
//     const createdRooms = [];

//     for (const roomData of roomList) {
//       const { hotelId, ...roomFields } = roomData;
//       const newRoom = new Room(roomFields);
//       const savedRoom = await newRoom.save();

//       await Hotel.findByIdAndUpdate(hotelId, {
//         $push: { rooms: savedRoom._id },
//       });

//       createdRooms.push(savedRoom);
//     }

//     res.status(201).json({
//       message: `${createdRooms.length} rooms created and linked to hotels.`,
//       rooms: createdRooms,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
