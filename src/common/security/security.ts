import bcrypt from "bcrypt"
import { env } from "../../config/env.service"
export const Generate_Hash = async ({ planText, salt = env.salt }: {
    planText: string,
    salt?: String
}): Promise<string> => {
    return await bcrypt.hash(planText, Number(salt))
}
export const Compare_Hash = async ({ planText, cypherText }: {
    planText: string,
    cypherText: string
}): Promise<boolean> => {
    return await bcrypt.compare(planText, cypherText)
}