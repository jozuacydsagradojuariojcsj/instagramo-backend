import { db } from "../config/db";
import { FollowType } from "../types/followType";

export const followerModel = (values:FollowType) => {
    return new Promise((resolve,reject) => {
        const sql = "INSERT INTO followers (followed_userid, follower_userid) VALUES (?, ?)";
        const followValues = [values.followed_userid, values.follower_userid];
        db.query(sql, followValues,(err,data) => {
            if(err) {
                console.log(`Error on followModel: ${err}`);
                return reject(err);
            }
            return resolve(data);
        })
    })
}

export const unfollowModel = (values:FollowType) => {
    return new Promise((resolve,reject) => {
        const sql = "DELETE FROM followers WHERE follower_userid = ? AND followed_userid = ?";
        const unfollowValues = [values.follower_userid, values.followed_userid];
        db.query(sql, unfollowValues,(err,data) => {
            if(err){
                console.log(`Error in unfollowModel:${err}`)
                return reject(err);
            }
            return resolve(data);
        })
    })
}