import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import z from "zod";

export const loginUserValidation = (schema:z.ZodObject<any,any>) => {
    return (req:Request, res:Response, next:NextFunction) => {
        try{
            schema.parse(req.body);
            next();
        }catch(e){
            if(e instanceof z.ZodError) {
                const errorMessages = e.errors.map((issue) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));
                res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid Data", details:errorMessages});
            }else{
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal Server Error"});
            }
        }
    }
}

export const registerUserValidation = (schema: z.ZodObject<any,any>) => {
    return (req:Request, res:Response, next:NextFunction) => {
        try{
            schema.parse(req.body);
            next();
        }catch(e){
            if(e instanceof z.ZodError) {
                const errorMessages = e.errors.map((issue) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));
                res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid Data", details: errorMessages});
            }else{
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal Server Error"})
            }
        }
    }
    
}

