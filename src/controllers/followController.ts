import dotenv from "dotenv";
import { Request, Response } from "express";
import { BadRequest, Created, InternalServerError, OK } from "../utils/responseStatus";
import { FollowType } from "../types/followType";
import { followerModel, unfollowModel } from "../models/followModel";

export const followerController = async(req:Request, res:Response) => {
    try{
        const follower_userid = Number(req.user.userid);
        const followed_userid = Number(req.body.followed_userid);

        if(isNaN(follower_userid || followed_userid)) {
            BadRequest(res,"Follower or Followed User ID is NaN");
            return;
        }
        
        const followValues:FollowType = {
            follower_userid,
            followed_userid
        }
        await followerModel(followValues);
        Created(res, "Successfully followed a person");
        return;
    }catch(e){
        InternalServerError(res, `Server Error ${e}`);
        return;
    }
};

export const unfollowController = async(req:Request, res:Response) => {
    try{
        const follower_userid = Number(req.user.userid);
        const followed_userid = Number(req.body.followed_userid);

        if(isNaN(follower_userid || followed_userid)) {
            BadRequest(res,"Follower or Followed User ID is NaN");
            return;
        }
        
        const unfollowValues:FollowType = {
            follower_userid,
            followed_userid
        }
        await unfollowModel(unfollowValues);
        OK(res, "Successfully Unfollowed the Person");
        return;
    }catch(e){
        InternalServerError(res, `Server Error ${e}`);
        return;
    }
};