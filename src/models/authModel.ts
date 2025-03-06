import { CreateUser, User } from "../types/userType";
import { db } from "../config/db";

export const findUserByEmail = (email:string) => {
    return new Promise((resolve, reject) =>{
        const sql = "SELECT * FROM users WHERE or email = ?";
        db.query(sql, email, (err, data)=>{
            if(err){
                console.log(`Error on adminModel: ${err}`);
                return reject(err);
            }
            if(data.length > 0) {
                console.log(`adminModel found email ${data[0].email}`)
                return resolve(data[0])
            }
            console.log("Username not found in db");
            return resolve(null);
        });
    });
}


export const getUserModel = (identifier:string):Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE username = ? OR email = ?";
        db.query(sql,[identifier, identifier], (err, data) => {
            
            if(err){
                return reject(err);
            }
            if(data.length > 0){
                const dbUser = data[0];

                const user: User = {
                    userid: dbUser.userid,
                    identifier: identifier,
                    email:dbUser.email,
                    first_name: dbUser.first_name,
                    last_name:dbUser.last_name,
                    username:dbUser.username,
                    password: dbUser.password,
                    roles: dbUser.roles
                };
                console.log("maderfader",user)
                return resolve(user)
            }else{
                return resolve(null);
            }
        });
    });

}


export const createUserModel = (values:CreateUser):Promise<CreateUser | null> => {
    return new Promise((resolve,reject) => {
        const sql = "INSERT INTO users (`email`, `username`, `password`, `first_name`, `last_name`) VALUES (?, ?, ?, ?, ?)";

        const userValues = [values.email, values.username, values.password, values.first_name, values.last_name];

        db.query(sql, userValues,(err,data) => {
            if(err){
                console.log(`Error on adminModel: ${err}`)
                return reject(err);
            }
            console.log(`User Data createUser Model: ${data}`);
            return resolve(data);
        });
    });

}
