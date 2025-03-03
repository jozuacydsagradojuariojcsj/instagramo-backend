import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import z from "zod";

export const createPostValidation = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.user.userid = Number(req.user.userid);
      if (isNaN(req.user.userid)) {
        res.status(400).json({ error: "User id is not a Number" });
        return;
      }

      const uploadedFiles = req.files as Express.Multer.File[];

      if (!uploadedFiles || uploadedFiles.length === 0) {
        res.status(400).json({ error: "No files uploaded" });
        return;
      }

      req.body.file_path = uploadedFiles["file_path"].map((file) => file.path);

      schema.parse(req.body);
      next();
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errorMessages = e.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid Datas", details: errorMessages });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };
};
