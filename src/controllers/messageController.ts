import { Request, Response } from "express";
import { BadRequest, Created, InternalServerError } from "../utils/responseStatus";
import { CreateMessage } from "../types/messagesType";
import { sendMessageModel, createChatRoomsModel } from "../models/messageModel";

export const messageController = async(req: Request, res:Response) => {
    try{
        let chat_room_id : string;
        const {message, sender_id, receiver_id}  = req.body;
        chat_room_id = req.params.id;

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
                chat_room_id:chatRoomId.toString(),
                message
            }
            await sendMessageModel(newMessageValue);
        }else{
            console.log("there is a chat room id")
            const messageValue : CreateMessage = {
                sender_id,
                receiver_id,
                chat_room_id,
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