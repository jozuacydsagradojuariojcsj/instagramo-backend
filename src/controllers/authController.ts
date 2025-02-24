import { getUser } from "../models/authModel";
import { comparePassword } from "../helpers/authHelper";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { User } from "../types/userType";

dotenv.config();

export const loginController = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      res.status(400).json({ error: "Missing username or email or password" });
      return;
    }

    const user: User | null = await getUser(identifier);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    console.log(user);
    comparePassword(req, res, user);
  } catch (e) {
    res.status(500).json({ error: `Internal Server Error: ${e}` });
    return;
  }
};
