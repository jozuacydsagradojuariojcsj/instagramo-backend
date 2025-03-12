import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

export const BadRequest = (res:Response, error:string) => {
    return res.status(StatusCodes.BAD_REQUEST).json({error:error});
}

export const OK = (res:Response, message:string) => {
    return res.status(StatusCodes.OK).json({message:message});
}

export const InternalServerError = (res:Response, error:string) => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error});
}

export const Conflict = (res:Response, error:string) => {
    return res.status(StatusCodes.CONFLICT).json({error:error});
}
