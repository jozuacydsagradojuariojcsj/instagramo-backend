import { User } from "../types/userType";
import { db } from "../config/db";


export const getUser = (identifier:string):Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE username = ? OR email = ?";
        db.query(sql,[identifier, identifier], (err, data) => {
            if(err){
                return reject(err);
            }
            if(data.length > 0){
                const user = data[0];
                console.log(user.message)
                return resolve(user)
            }else{
                return reject(err);
            }
        });
    });

}