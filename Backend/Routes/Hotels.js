import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from "../Controllers/HotelController.js";
import { adminVerification } from "../Utilities/Verifications.js";

const router = express.Router ();

// CREATE
router.post ("/", adminVerification, createHotel)

// UPDATE
router.put ("/:id", adminVerification, updateHotel);

// DELETE
router.delete ("/:id", adminVerification, deleteHotel);

// GET
router.get ("/:id", getHotel);

// GET ALL
router.get ("/", getAllHotels);
router.get ("/countByCity", countByCity);
router.get ("/countByType", countByType);
router.get("/room/:id", getHotelRooms);



export default router 