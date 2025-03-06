import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../types/userType";

dotenv.config();
import { NextFunction, Request, Response } from "express";
import { error } from "console";

const accessSecret = process.env.ACCESS_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

export const comparePasswordHelper = (
  req: Request,
  res: Response,
  user: User
) => {
  bcrypt.compare(req.body.password, user.password, async (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: `Error Verifying Password, ${err}` });
    }

    if (result) {
      const accessToken = jwt.sign(
        { userid: user.userid, identifier: user.identifier, roles: user.roles },
        accessSecret,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        { userid: user.userid, identifier: user.identifier, roles: user.roles },
        refreshSecret,
        { expiresIn: "7d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      console.log("asdasd", refreshToken);
      console.log(accessToken);
      return res
        .status(200)
        .json({ message: "Login Successful", user, token: accessToken });
    } else {
      return res.status(401).json({ error: `Incorrect Password, ${err}` });
    }
  });
};

export const generateCredentials = (first_name: string, last_name: string) : {username:string, password:string} => {
  const username = `${first_name.charAt[0].toUpperCase()}${last_name}`;
  const password = Math.random().toString(36).slice(-8);

  return { username, password };
};
