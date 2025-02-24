import z from "zod";

export const registerUserSchema = z.object({
    email: z.string({required_error: "Email is required"}).email({message: "Invalid email format"}),
    username: z.string({required_error: "Username is required"}).min(5, "Username must be at least 5 characters long"),
    password: z.string({required_error: "Password is required"}).min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must at least have one special Character")
});

export const updateUserSchema = z.object({
    userId: z.number({required_error: "User ID is missing"}),
    username: z.string().min(5,"Username must be 5 characters or more").optional(),
    password: z.string().min(8, "Password must be 8 characters or more")
    .regex(/[A-Z]/, "Password must at least have one uppercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must at least have one special Character").optional(),
    roles: z.enum(["admin", "user"]).optional(),
});

export const loginUserSchema = z.object({
    identifier: z.union([
        z.string().email("Invalid Email Format"),
        z.string()
    ]),
    password: z.string()
});