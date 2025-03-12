import { CreateStory } from "../types/storyType";
import { db } from "../config/db";

export const createStoryModel = (values:CreateStory) => {
    return new Promise((resolve,reject) => {
        const sql = "INSERT INTO stories (userid, file_path) VALUES (?, ?)";

        const storyValues = [values.userid, JSON.stringify(values.file_path)];

        db.query(sql, storyValues, (err,data) => {
            if(err){
                console.log(`Error on storyModel: ${err}`)
                return reject(err);
            }
            return resolve(data);
        })
    })
}