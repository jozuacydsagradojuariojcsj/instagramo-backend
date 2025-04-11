import { Request, Response } from "express";
import { BadRequest, Created, InternalServerError } from "../utils/responseStatus";
import { ChatRoomsID, CreateMessage, SenderReceiverID } from "../types/messagesType";
import { sendMessageModel, createChatRoomsModel, selectChatRoomsModel } from "../models/messageModel";

export const messageController = async(req: Request, res:Response) => {
    try{
        const sender_id = req.user.userid;
        const {message, receiver_id}  = req.body;

        const chatRoomValues : SenderReceiverID= {
            sender_id,
            receiver_id
        };

        let chat_room_id: ChatRoomsID = await selectChatRoomsModel(chatRoomValues)
        console.log("CHTROOMID",chat_room_id)

        if(!message){
            BadRequest(res, "Message is empty");
            return;
        }
        
        if(!chat_room_id) {
            const chatRoomId = await createChatRoomsModel();
            console.log(`Chat rooms data: ${chatRoomId}`);

            const newMessageValue: CreateMessage = {
                sender_id,
                receiver_id,
                chat_room_id: chatRoomId.toString() || chatRoomId["id"],
                message
            }
            await sendMessageModel(newMessageValue);
        }else{
            console.log("there is a chat room id")
            const messageValue : CreateMessage = {
                sender_id,
                receiver_id,
                chat_room_id:chat_room_id["id"].toString(),
                message
            }

            await sendMessageModel(messageValue)
        }
        Created(res, "Message Created");
        return;
    }catch(e){
        InternalServerError(res, `Server Error: ${e}`); 
        return;
    }
}