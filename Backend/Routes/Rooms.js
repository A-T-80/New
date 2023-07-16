import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from "../Controllers/RoomController";
import { adminVerification } from "../Utilities/Verifications";

const router = express.Router ();

// CREATE
router.post ("/:hotelid", adminVerification, createRoom)

// UPDATE
router.put ("/:id", adminVerification, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

// DELETE
router.delete ("/:id/:hotelid", adminVerification, deleteRoom);

// GET
router.get ("/:id", getRoom);

// GET ALL
router.get ("/", getAllRooms);


export default router 