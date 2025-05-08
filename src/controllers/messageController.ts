import { Request, Response } from "express";
import { BadRequest, Created, InternalServerError, OK } from "../utils/responseStatus";
import { ChatRoomsID, CreateMessage, SenderReceiverID } from "../types/messagesType";
import { sendMessageModel, createChatRoomsModel, selectChatRoomsModel, getMessageModel } from "../models/messageModel";
import { emitNewMessage } from "../services/webSocketServices/messageSocket";

export const createMessageController = async(req: Request, res:Response) => {
    try{
        const chat_room_id = req.params.chatRoomId;
        const sender_id = req.user.userid;
        const {message, receiver_id}  = req.body;

        if(chat_room_id){
            const messageValue : CreateMessage = {
                sender_id,
                receiver_id,
                chat_room_id:chat_room_id.toString(),
                message
            }
            console.log("controller",messageValue);
            await emitNewMessage(messageValue || null)
            await sendMessageModel(messageValue)
        }else{
            const chatRoomId = await createChatRoomsModel();
            const newMessageValue: CreateMessage = {
                sender_id,
                receiver_id,
                chat_room_id: chatRoomId.toString() || chatRoomId["id"],
                message
            }
            console.log("controller",newMessageValue)
            await emitNewMessage(newMessageValue || null)
            await sendMessageModel(newMessageValue);
        }
        Created(res, "Message Created");
        return;
    }catch(e){
        InternalServerError(res, `Server Error: ${e}`); 
        return;
    }
}

export const getMessageController = async(req:Request, res:Response) => {
    try{
        const sender_id = req.user.userid;
        const receiver_id = Number(req.params.receiverId);
        if(!receiver_id || !sender_id){
            BadRequest(res, "No Sender or Receiver ID");
            return;
        }

        const values : SenderReceiverID = {
            sender_id,
            receiver_id,
        }

        const chatRooms : ChatRoomsID = await selectChatRoomsModel(values);
        if(!chatRooms){
            OK(res, []);
            return;
        }

        const messages = await getMessageModel(chatRooms["id"].toString());
        OK(res, messages)
        return;
    }catch (e) {
        console.log(e);
        InternalServerError(res, `Server Error ${e}`)
        return;
    }
}