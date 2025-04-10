import { NextFunction, Request, Response } from "express";
import { FollowType } from "../../types/followType";
import { BadRequest, InternalServerError } from "../../utils/responseStatus";
import z from "zod";

export const followerValidationMiddleware = (Schema:z.ZodObject<any,any>) => {
    return (req:Request, res:Response, next:NextFunction) => {
        try{
            if(!req.body.followed_userid || !req.user.userid) {
                BadRequest(res, "Missing required fields");
                return;
            }

            const parsedSchema : FollowType = {
                followed_userid: req.body.followed_userid,
                follower_userid: req.user.userid
            };

            Schema.parse(parsedSchema);
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