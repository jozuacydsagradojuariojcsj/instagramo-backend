import z from "zod";

export const createMessageSchema = z.object({
    sender_id:z.number({required_error:"Missing Sender User ID"}),
    receiver_id:z.number({required_error:"User Receiver ID is required"}),
    chat_room_id:z.string().optional(),
    message:z.string({required_error:"Message is required"}),
});

