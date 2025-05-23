import { CreatePosts } from "../types/postType";
import { db } from "../config/db";

export const createPostModel = (values:CreatePosts) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO posts (userid, file_path, caption) VALUES (?, ? ,?)";

        const postValues = [values.userid, JSON.stringify(values.file_path), values.caption];
        
        db.query(sql, postValues,(err,data) => {
            if(err) {
                console.log(`Error on postModel: ${err}`)
                return reject(err);
            }
            return resolve(data);
        })
    })

}

export const getAllPostModel = () => {
    return new Promise((resolve,reject) => {
        const sql = "SELECT users.username, posts.postid, posts.caption, posts.file_path, posts.created_at FROM users INNER JOIN posts ON users.userid = posts.userid;"
        db.query(sql,(err,data) => {
            if(err){
                return reject(err);
            }
            return resolve(data);
        })
    })
}