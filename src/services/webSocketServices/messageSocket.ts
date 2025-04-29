import { CreateMessage } from "src/types/messagesType";
import { io } from "../webSocket";


export const emitNewMessage = (messageValue : CreateMessage) => {
    io.to(messageValue.chat_room_id).emit("receive_message",messageValue.message);
};

