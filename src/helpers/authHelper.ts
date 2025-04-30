import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../types/userType";
import nodemailer from "nodemailer";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import { error } from "console";
import { findUserByUsername } from "../models/authModel";

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
      res.cookie("accessToken",accessToken, {
        httpOnly: true, // Prevents JavaScript access
        secure: true, // Only send over HTTPS
        sameSite: "strict", // Helps prevent CSRF attacks
        maxAge: 60 * 60 * 1000,
      })

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      console.log("asdasd", refreshToken);
      console.log(accessToken);
      return res
        .status(200)
        .json({ message: "Login Successful", user });
    } else {
      return res.status(401).json({ error: `Incorrect Password, ${err}` });
    }
  });
};

export const generateCredentials = async(first_name: string, last_name: string) : Promise<{username:string, password:string}> => {
  let username = `${first_name.charAt(0).toUpperCase()}${last_name}`;
  let counter = 1;
  
  const exists  = await findUserByUsername(username);

  console.log("exists",exists)
  if(exists){
    console.log(`${counter}`)
    username = `${first_name.charAt(0).toUpperCase()}${last_name}${counter}`
    counter++
    console.log(counter)
  }

  const password = Math.random().toString(36).slice(-8);
  console.log(`Username: ${username}, Password: ${password}`)

  return { username, password };
};


export const sendMail = async(username:string, password:string, to:string) => {
  try{
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
    });
  
    const mailOptions = {
      from: `"Instagramo" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Insatgramo Username and Password",
      text: `Greetings, This is your Insatgramo Username and Password. Username:${username} Password:${password}. If you cannot log in using your username, kindly use your email upon logging in. Thank you for using Insatgramo`
    };
  
    const info = await transporter.sendMail(mailOptions);
    console.log(info)
  
    return info;
  }catch(e){
    console.error("Error shiet",e);
    throw error;
  }
};