import jwt from "jsonwebtoken";
import { createError } from "./Errors.js"

export const tokenVerification = (req, res, next) => {
    const token = req.cookies.access_token;
    if (! token) {
        return next (createError (401, "You are not authenticated for this action"));
    }

    jwt.verify (token, process.env.JWT, (err, user) => {
        if (err) return next (createError (403, "Invalid token"));
        req.user = user;
        next ();
    });
};

export const userVerification = (req, res, next) => {
    tokenVerification (req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next ();
        } else {
        if (err) return next (createError (403, "You are not authorised to perform this action"));
        }
    })
};

export const adminVerification = (req, res, next) => {
    tokenVerification (req, res, next, () => {
        if (req.user.isAdmin) {
            next ();
        } else {
        if (err) return next (createError (403, "You are not authorised to perform this action"));
        }
    })
};