import { Request, Response } from "express";
import { BadRequest, Created, InternalServerError, OK } from "../utils/responseStatus";
import { ChatRoomsID, CreateMessage, SenderReceiverID } from "../types/messagesType";
import { sendMessageModel, createChatRoomsModel, selectChatRoomsModel, getMessageModel } from "../models/messageModel";

export const createMessageController = async(req: Request, res:Response) => {
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
        console.log(messages)
        OK(res, messages)
        return;
    }catch (e) {
        console.log(e);
        InternalServerError(res, `Server Error ${e}`)
        return;
    }
}