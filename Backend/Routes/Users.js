import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../Controllers/UserController.js";
import { tokenVerification, userVerification, adminVerification } from "../Utilities/Verifications.js";

const router = express.Router ();

// router.get ("/auth_check/:id", TokenVerification, (req, res, next) => {
//     res.send ("Logged in!");
// });

// router.get ("/user_check", UserVerification, (req, res, next) => {
//     res.send ("User logged in!");
// });

// router.get ("/admin_check", AdminVerification, (req, res, next) => {
//     res.send ("Admin logged in!");
// });

// UPDATE
router.put ("/:id", userVerification, updateUser);

// DELETE
router.delete ("/:id", userVerification, deleteUser);

// GET
router.get ("/:id", userVerification, getUser);

// GET ALL
router.get ("/", adminVerification, getAllUsers);


export default router 