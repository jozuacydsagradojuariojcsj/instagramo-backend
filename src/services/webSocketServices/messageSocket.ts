import { CreateMessage, GetMessage } from "src/types/messagesType";
import { io } from "../webSocket";



export const emitNewMessage = async (messageValue : CreateMessage) => {
    if(messageValue != null) {
        io.to(messageValue.chat_room_id).emit("receive_message",messageValue);
        console.log("what?",messageValue)
    }    
};

