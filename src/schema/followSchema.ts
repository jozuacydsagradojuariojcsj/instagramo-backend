import z from "zod";

export const followerSchema = z.object({
    follower_userid:z.number({required_error:"Missing Follower User ID"}),
    followed_userid:z.number({required_error:"Missing Followed User ID"}),
});