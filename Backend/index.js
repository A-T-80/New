import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./Routes/Auth.js"
import usersRoute from "./Routes/Users.js"
import hotelsRoute from "./Routes/Hotels.js"
import roomsRoute from "./Routes/Rooms.js"
import cookieParser from "cookie-parser";

const app = express ();
dotenv.config ();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log ("MongoDB Connected");
    } catch (error) {
        throw error;
    }
};

// Middlewares
app.use (cookieParser);
app.use (express.json ());

app.use ("/api/auth", authRoute);
app.use ("/api/users", usersRoute);
app.use ("/api/rooms", roomsRoute);
app.use ("/api/hotels", hotelsRoute);



app.listen (process.env.PORT, () => {
    connect ();
    console.log ("Backend connected.");
});