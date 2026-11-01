import z from "zod";

export const postValidation = z.strictObject({
    title: z.string().min(5, { error: "title must be at least 5 characters" }),
    content: z.string().min(5, { error: "content must be at least 5 characters" })
});