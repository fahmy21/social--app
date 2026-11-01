import { z } from "zod"


export const SignupSchema = {
    body: z.strictObject({
        UserName: z.string().min(5).max(25),
        Email: z.email(),
        Password: z.string(),
        PhoneNumber: z.string(),
        confirmPassword: z.string()
    }).superRefine((data, ctx) => {

        if (data.Password !== data.confirmPassword) {
            ctx.addIssue({
                code: "custom",
                message: "password not matched",
                path: ["confirmPassword"]
            })
        }
    })
}