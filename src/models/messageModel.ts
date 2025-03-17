import { CreateMessage } from "../types/messagesType";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/db";

export const sendMessageModel = (values:CreateMessage) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO chat_rooms (sender_id, receiver_id, chat_room_id, message) VALUES (?, ?, ?, ?)";
        db.query(sql, [values.sender_id,values.receiver_id,values.chat_room_id,values.message], (err,data)=>{
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
}

export const createChatRoomsModel = () => {
    return new Promise ((resolve, reject) => {
        const chat_rooms_id = uuidv4();
        console.log(`createChatRoomsModel:${chat_rooms_id}`)
        const sql = "INSERT INTO chat_rooms (id) VALUES (?)";

        db.query(sql,[chat_rooms_id],(err,data) => {
            if(err){
                return reject(err);
            }
            console.log(`chat Rooms Model create: ${data.chat_rooms_id}`)
            return resolve(data);
        });
    });
}