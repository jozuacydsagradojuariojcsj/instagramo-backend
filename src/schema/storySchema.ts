import z from "zod";

export const createStorySchema = z.object({
    file_path: z.array(z.string({required_error:"File Path is required"})),
})