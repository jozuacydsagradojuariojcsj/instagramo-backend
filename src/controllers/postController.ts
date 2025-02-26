import { createPostModel, getAllPostModel } from "../models/postModel";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { CreatePosts } from "../types/postType";
dotenv.config();

export const createPostController = async (req:Request, res:Response) => {
    try{
        const userid = req.body.userid;
        const file_path = req.body.file_path;
        const caption = req.body.caption;

        

        const postValue : CreatePosts = {
            userid,
            file_path,
            caption
        };

        await createPostModel(postValue);

        res.status(200).json({message: "Post Created Successfully"});
        return;
    }catch(e){
        res.status(500).json({error:`Internal Server Error ${e}`});
        return;
    }
}

export const getAllPostController = async(res:Response) => {
    try{
        const posts = await getAllPostModel();
        res.status(200).json(posts); 
    }catch(e){
        res.status(500).json({error:"Failed to retrieve posts", e});
    }
}