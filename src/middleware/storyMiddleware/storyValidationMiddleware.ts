import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import z from "zod";
import { BadRequest, InternalServerError } from "../../utils/responseStatus";

export const createStoryValidation = (schema:z.ZodObject<any,any>) => {
    return (req:Request, res:Response, next:NextFunction) => {
        try{
            req.user.userid = Number(req.user.userid);
            if(isNaN(req.user.userid)){
                BadRequest(res, "UserID is NaN");
                return;
            }

            const uploadedFile = req.files as Express.Multer.File[];

            if(!uploadedFile || uploadedFile.length === 0) {
                BadRequest(res, "No File Attached");
                return;
            }

            req.body.file_path = uploadedFile["file_path"].map((file) => file.path);

            schema.parse(req.body);
            next();
        }catch(e){
            if (e instanceof z.ZodError) {
                const errorMessages = e.errors.map((issue) => ({
                    message: `${issue.path.join(".")} is ${issue.message}`,
                }));
                BadRequest(res, `Invalid Data, ${errorMessages}`);
                return; 
            }else{
                InternalServerError(res,"Internal Server Error");
                return ;
            }
        }
    }
}