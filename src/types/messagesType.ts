export interface CreateMessage{
    sender_id:number;
    receiver_id:number;
    chat_room_id:string;
    message:string;
}

export interface SenderReceiverID{
    sender_id:number;
    receiver_id:number;
}

export interface ChatRoomsID{
    chat_rooms_id:string;
}

