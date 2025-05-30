import { SenderReceiverID, CreateMessage, ChatRoomsID, GetMessage } from "../types/messagesType";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/db";
import { resolve } from "path";

export const sendMessageModel = (values:CreateMessage) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO messages (sender_id, receiver_id, chat_room_id, message) VALUES (?, ?, ?, ?)";
        db.query(sql, [values.sender_id,values.receiver_id,values.chat_room_id,values.message], (err,data)=>{
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
}

export const getMessageModel = (values:ChatRoomsID):Promise<GetMessage> => {
    return new Promise((resolve, reject) => {
        console.log(values)
        const sql = "SELECT * FROM messages WHERE chat_room_id = ?";
        const chatRoomsId = [values]
        db.query(sql,chatRoomsId,(err,data) => {
            if(err){
                return reject(err);
            }
            return resolve(data);
        })
    })
}

export const createChatRoomsModel = () => {
    return new Promise ((resolve, reject) => {
        const chat_rooms_id = uuidv4();
        console.log(`createChatRoomsModel:${chat_rooms_id}`)
        const sql = "INSERT INTO chat_rooms (id) VALUES (?)";

        db.query(sql,chat_rooms_id,(err,data) => {
            if(err){
                return reject(err);
            }
            return resolve(chat_rooms_id);
        });
    });
}

export const selectChatRoomsModel = (values:SenderReceiverID):Promise<ChatRoomsID|null> => {
    return new Promise ((resolve,reject) => {
        const sql = "SELECT chat_room_id FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) LIMIT 1";
        const chatRoomValues = [values.sender_id, values.receiver_id, values.receiver_id, values.sender_id];
        db.query(sql, chatRoomValues, (err,data) => {
            if(err){
                console.log(`Error on selectChatRoomsModel: ${err}`)
                return reject(err);
            }
            return resolve(data[0]);
        })
    })

}