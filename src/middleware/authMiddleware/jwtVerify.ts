import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const secretKey = process.env.ACCESS_SECRET;

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  console.log("accesToken from frontend",token)

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log(token)
      console.log(err)
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    req.user = user as { userid: number };
    next();
  });
};
