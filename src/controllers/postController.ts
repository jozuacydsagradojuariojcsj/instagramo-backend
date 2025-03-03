import { createPostModel, getAllPostModel } from "../models/postModel";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { CreatePosts } from "../types/postType";
dotenv.config();

export const createPostController = async (req: Request, res: Response) => {
  try {
    const userid = Number(req.user.userid);
    const caption = req.body.caption;

    if (isNaN(userid)) {
      res.status(400).json({ error: "Invalid userid" });
      return;
    }

    const uploadedFiles = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (!uploadedFiles || !uploadedFiles["file_path"]) {
      res.status(400).json({ error: "No files uploaded" });
      return;
    }

    const filePaths = uploadedFiles["file_path"].map((file) => file.path);

    const postValue: CreatePosts = {
      userid,
      file_path: filePaths,
      caption,
    };

    await createPostModel(postValue);
    res.status(200).json({ message: "Post Created Successfully" });
    return;
  } catch (e) {
    res.status(500).json({ error: `Internal Server Errorsss ${e}` });
    return;
  }
};

export const getAllPostController = async (req:Request, res: Response) => {
  try {
    const posts = await getAllPostModel();
    res.status(200).json(posts);
    return;
  } catch (e) {
    res.status(500).json({ error: `Failed to retrieve posts: ${e}`});
    return;
  }
};

export const uploadProfileController = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No profile pictures added" });
  }

  return res
    .status(201)
    .json({
      message: "Profile Picture uploaded successfully",
      filePath: req.file.path,
    });
};
