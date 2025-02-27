import z from "zod";

export const createPostsSchema = z.object({
    userid: z.number({required_error: "User ID is required", invalid_type_error:"Wrong type"}),
    file_path: z.array(z.string({required_error:"File Path is required"})),
    caption: z.string().optional(),
});
