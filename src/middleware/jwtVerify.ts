import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

dotenv.config()

const secretKey = process.env.JWT_SECRET;

export const authenticateJWT = (req:Request, res:Response, next:NextFunction) => {
    const token = req.header('Authorization');

    if(!token) {
        return res.status(401).json({error:'Unauthorized'})
    }

    jwt.verify(token.split(' ')[1], secretKey, (err,user) => {
        if (err) {
            return res.status(403).json({error: "Forbidden"});
        }

        req.body.user = user;
        next();
    });
};