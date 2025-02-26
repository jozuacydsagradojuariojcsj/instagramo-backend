import {
  createUserModel,
  findUserByUsername,
  getUserModel,
} from "../models/authModel";
import { comparePasswordHelper } from "../helpers/authHelper";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { CreateUser, User } from "../types/userType";
import jwt from "jsonwebtoken";

dotenv.config();

export const loginController = async (req: Request, res: Response) => {
  console.log("wazzap maderadfas")
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      res.status(400).json({ error: "Missing username or email or password" });
      return;
    }
    

    const user: User = await getUserModel(identifier);

    console.log("asdasdasdas",user)
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    comparePasswordHelper(req, res, user);
  } catch (e) {
    res.status(500).json({ error: `Internal Server Errors: ${e}` });
    return;
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username || !email) {
      res.status(500).json({ error: "Missing Username, Email or Password" });
      return;
    }

    const user = await findUserByUsername(username, email);

    if (user) {
        res.status(409).json({ message: "Username or Email already exists" });
        return;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const values: CreateUser = {
        username,
        password: hashedPassword,
        email,
      };

      await createUserModel(values);

      res.status(201).json({ message: "User Created Successfully" });
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: `Internal Server Error: ${e}` });
    return;
  }
};

export const refreshTokenController = (req: Request, res:Response) => {
  if(req.cookies?.jwt) {
    const refreshToken = req.cookies.jwt;
    const refreshSecret = process.env.REFRESH_SECRET;

    jwt.verify(refreshToken, refreshSecret, (err,user) => {
        if (err) {
          res.status(406).json({error: "Unauthorized"});
          return; 
        }else{
          const accessToken = jwt.sign({userid:user.userid, identifier:user.identifier, roles:user.roles}, refreshSecret, {expiresIn:"1h"})
          res.json({accessToken});
          return; 
        }
      })
  }else{
    res.status(406).json({message:'Unauthorized'});
    return;
  }
};
