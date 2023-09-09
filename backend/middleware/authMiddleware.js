import jwt from "jsonwebtoken"
import asyncHandler from "./asyncHandler.js"
import User from "../models/userModel.js"

//Protect function to protect routes for users that are registered

export const protect = asyncHandler( async (req,res,next) => {
    let token;

    //read the JWT from the cookie

     token = req.cookies.jwt
})