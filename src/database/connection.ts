import mongoose from "mongoose"
import { env } from "../config/env.service";
export const Database_Connection = () => {

    mongoose.connect(env.database_url as string)
        .then(() => {
            console.log("database connected");
        })
        .catch((err) => {
            console.log("database connection error", err);
        })

}