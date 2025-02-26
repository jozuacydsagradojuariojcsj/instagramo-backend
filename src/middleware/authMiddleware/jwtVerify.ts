import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

dotenv.config()

const secretKey = process.env.ACCESS_SECRET;

export const authenticateJWT = (req:Request, res:Response, next:NextFunction) => {
    const token = req.header('Authorization');

    if(!token) {
        res.status(401).json({error:'Unauthorized'})
        return; 
    }

    jwt.verify(token.split(' ')[1], secretKey, (err,user) => {
        if (err) {
            res.status(403).json({error: "Forbidden"});
            return;
        }

        req.body.user = user;
        next();
    });
};