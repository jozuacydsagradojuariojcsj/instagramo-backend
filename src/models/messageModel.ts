import { CreateMessage } from "../types/messagesType";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/db";

export const messageModel = (values:CreateMessage) => {
    return new Promise((resolve,reject) => {
        if(values.chat_room_id === null) {
            const chatRoomId = uuidv4();
            let chat_room_id;
            const sql = "INSERT INTO chat_rooms (id) VALUES (?)";
            db.query(sql,[chatRoomId],(err,data) => {
                if(err){
                    console.log(`Error on messageModel: ${err}`)
                    return reject(err)
                }
                chat_room_id = data.chat_room_id;
                return resolve(data);
            });

            const messsageSQL = "INSERT INTO messages (sender_id, receiver_id, chat_room_id, message) VALUES (?, ?, ?, ?)";
            db.query(messsageSQL,[values.sender_id, values.receiver_id, chat_room_id, values.message],(err,data) => {
                if(err){
                    console.log(`Error on messageModel sending message: ${err}`)
                    return reject(err);
                }
                return resolve(data)
            });
        }else{
            const sql = "INSERT INTO messages (sender_id, receiver_id, chat_room_id, message) VALUES (?, ?, ?, ?)";
            db.query(sql,[values.sender_id, values.receiver_id, values.chat_room_id, values.message],(err,data) => {
                if(err){
                    console.log(`Error on messageModel sending message: ${err}`)
                    return reject(err);
                }
                return resolve(data)
            });
            
        }
    });
}