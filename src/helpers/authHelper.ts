import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../types/userType";

dotenv.config();
import { Request, Response } from "express";




const secretKey = process.env.JWT_SECRET;

export const comparePassword = (req:Request, res:Response, user:User ) => {
    bcrypt.compare(req.body.password, user.password, async (err, result) => {
        if (err) {
            return res.status(500).json({error: `Error Verifying Password, ${err}`});
        }

        if (result) {
            const token = jwt.sign({id:user.id, username:user.identifier, roles:user.roles},secretKey,{expiresIn:"1h"});
            console.log(token)
            return res.status(200).json({message: "Login Successful", user, token});
        }else{
            return res.status(401).json({error: `Incorrect Password, ${err}`});
        }
    });
}