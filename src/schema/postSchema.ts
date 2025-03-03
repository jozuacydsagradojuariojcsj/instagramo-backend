import z from "zod";

export const createPostsSchema = z.object({
    file_path: z.array(z.string({required_error:"File Path is required"})),
    caption: z.string().optional(),
});
