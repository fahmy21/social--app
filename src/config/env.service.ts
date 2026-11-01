import dotenv from "dotenv";
import path from "path";


dotenv.config({
    path: path.resolve(`./src/config/.env.${process.env.NODE_ENV}`)
});


const port = process.env.PORT
const mood = process.env.MOOD
const salt = process.env.SALT
const jwt_key_admin = process.env.JWT_KEY_Admin
const jwt_key_user = process.env.JWT_KEY_User
const admin_refresh_token = process.env.ADMIN_REFRESH_TOKEN
const user_refresh_token = process.env.USER_REFRESH_TOKEN
const google_account_email = process.env.GOOGLE_ACCOUNT_EMAIL
const google_app_password = process.env.GOOGLE_APP_PASSWORD
const server_URL=process.env.SERVER_URL
const redis_url=process.env.REDIS_URL
const encryption_key= process.env.ENCRYPTION_KEY
const google_clint_id= process.env.GOOGLE_CLIENT_ID
const database_url =process.env.MONGO_URL
const Access_key_ID=process.env.ACCESS_kEY_ID
const Secret_access_key=process.env.SECRET_ACCESS_KEY
const aws_bucket_name=process.env.AWS_BUCKET_NAME
export const env={
    port,
    mood,
    salt,
    jwt_key_admin,
    jwt_key_user,
    admin_refresh_token,
    user_refresh_token,
    google_account_email,
    google_app_password,
    server_URL,
   redis_url,
   encryption_key,
   google_clint_id,
   database_url,
   Access_key_ID,
   Secret_access_key,
   aws_bucket_name
}