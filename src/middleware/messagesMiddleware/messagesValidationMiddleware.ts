import { NextFunction, Request, Response } from "express";
import z from "zod";
import { CreateMessage } from "../../types/messagesType";
import { BadRequest, InternalServerError } from "../../utils/responseStatus";

export const sendMessageValidationMiddleware = (schema:z.ZodObject<any,any>) => {
    return (req:Request, res:Response, next:NextFunction) => {
        try{
            
            if (!req.body.sender_id || !req.body.receiver_id || !req.body.message) {
                BadRequest(res, "Missing required fields");
                return; 
            }

            const parsedSchema : CreateMessage = {
                sender_id:req.body.sender_id,
                receiver_id:req.body.receiver_id,
                chat_room_id:req.params.id,
                message:req.body.message,
            };

            schema.parse(parsedSchema);
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