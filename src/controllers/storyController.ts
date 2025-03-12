import { Request, Response } from "express";
import dotenv from "dotenv";
import { BadRequest, InternalServerError, OK } from "../utils/responseStatus";
import { CreateStory } from "../types/storyType";
import { createStoryModel } from "../models/storyModel";

dotenv.config();

export const createStoryController = async (req: Request, res:Response) => {
    try{
        const userid = Number(req.user.userid);
        const caption = req.body.caption;

        if(isNaN(userid)) {
            BadRequest(res, "User ID is not a Number");
            return; 
        }

        const uploadedFile = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        if (!uploadedFile || !uploadedFile["file_path"]){
            BadRequest(res, "No Files Uploaded");
            return;
        }

        const filePath = uploadedFile["file_path"].map((file) => file.path);

        const storyValue: CreateStory = {
            userid,
            file_path: filePath
        }

        await createStoryModel(storyValue);
        OK(res, "Story Created Successfully");
        return;
    }catch(e){
        InternalServerError(res, `Internal Server Error ${e}`);
        return; 
    }
};