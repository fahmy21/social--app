import z from "zod";

export const commentValidation = z.strictObject({

    content: z.string().min(1, {
        error: "content is required"
    })

});