import express from "express";
import type { Express, Request, Response } from "express";
import authRouter from "./module/auth/auth.controller"
import userRouter from "./module/user/user.controller"
import cors from "cors"
import { rateLimit } from 'express-rate-limit'
import helmet from "helmet";
import { env } from "./config/env.service";
import { Database_Connection } from "./database/connection";
import { Global_Error_Handler } from "./middleware/ErrorHandling";
import { Bad_Request_Exception } from "./common/excaptions/error.exceptions";
import { sS3_Service } from "./common/service/s3.service";
import { pipeline } from "stream";
import { promisify } from "util"
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from "./module/auth/gql";
import { redis } from "./common/service/redis.service";
import { Server } from "socket.io";
import { TokenService } from "./common/service/token.service";
import { log } from "console";
import { realTime_GateWay } from "./module/RealTime/realtime.gateway";



export const bootstrap = async () => {
    await redis.connect();
    const S3GETFile = promisify(pipeline)
    const app: Express = express();
    app.use(express.json());

    
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH"]
    }))

    app.all('/GraphQl', createHandler({ schema:schema, context:(req )=>({req}) }))
    //////////////////////////////////////////////////////////////////////////////////////////    


    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100,
    })

    app.use(limiter)
    app.use(helmet());
    Database_Connection()
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use(Global_Error_Handler)


    //////////////////////////////////////////////////////////////////////////////////////////    
    app.get('/uploads/*path', async (req: Request, res: Response) => {
        let { path } = req.params as { path: string[] };
        if (!path || path.length === 0) {
            throw new Bad_Request_Exception("path not found");
        }
        let key = path.join('/');
        let { Body, ContentType } = await sS3_Service.getFile({
            Key: key
        });
        if (!Body) {
            throw new Bad_Request_Exception("file not found");
        }
        res.set("Cross-Origin-Resource-Policy", "cross-origin");
        res.setHeader(
            "Content-Type",
            ContentType || "application/octet-stream"
        );
        await S3GETFile(
            Body as NodeJS.ReadableStream,
            res
        );
    });
    //////////////////////////////////////////////////////////////////////////////////////////
    // *******************************************************************

    const HttpServer = app.listen(env.port, () => {
        console.log(`Server is running on port ${env.port}`);
    });

   realTime_GateWay.initalizer(HttpServer)
};