import {
    DeleteObjectCommand,
    GetObjectCommand,
    ObjectCannedACL,
    PutObjectCommand,
    S3Client
} from "@aws-sdk/client-s3";

import { env } from "../../config/env.service";
import { Multer_Storage } from "../enums/multer.enums";
import { createReadStream } from "fs";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class S3_service {

    private client: S3Client;

    constructor() {

        console.log({
            accessKeyId: env.Access_key_ID ? "EXISTS" : "MISSING",
            secretAccessKey: env.Secret_access_key ? "EXISTS" : "MISSING",
            bucket: env.aws_bucket_name ? "EXISTS" : "MISSING"
        });

        this.client = new S3Client({
            region: "eu-north-1",

            credentials: {
                accessKeyId: env.Access_key_ID as string,
                secretAccessKey: env.Secret_access_key as string
            }
        });

    }

    //////////////////////////////////////////////////////////////////////////////////////////////

    async uploadfile({
        storagekey = Multer_Storage.memoryStorage,
        Bucket = env.aws_bucket_name,
        path = "general",
        file,
        Acl = ObjectCannedACL.private,
        contentType

    }: {
        storagekey?: Multer_Storage,
        Bucket?: string,
        path?: string,
        file: Express.Multer.File,
        Acl?: ObjectCannedACL,
        contentType?: string
    }) {

        const key = `SocialMedia/${path}/${Math.round(Date.now() / 1000)}-${file.originalname}`;

        await this.client.send(
            new PutObjectCommand({
                Bucket: Bucket,
                Key: key,
                Body: storagekey == Multer_Storage.memoryStorage
                    ? file.buffer
                    : createReadStream(file.path),
                ACL: Acl,
                ContentType: contentType
            })
        );

        return {
            location: key
        };
    }

    //////////////////////////////////////////////////////////////////////////////////////////////

    async uploadBigfile({
        storagekey = Multer_Storage.diskStorage,
        Bucket = env.aws_bucket_name,
        path = "general",
        file,
        Acl = ObjectCannedACL.private,
        contentType,
        PartSize = 5

    }: {
        storagekey?: Multer_Storage,
        Bucket?: string,
        path?: string,
        file: Express.Multer.File,
        Acl?: ObjectCannedACL,
        contentType?: string,
        PartSize?: number

    }) {

        const key = `SocialMedia/${path}/${Math.round(Date.now() / 1000)}-${file.originalname}`;

        const result = await new Upload({
            client: this.client,

            params: {
                Bucket,
                Key: key,
                ACL: Acl,
                Body: storagekey == Multer_Storage.memoryStorage
                    ? file.buffer
                    : createReadStream(file.path),
                ContentType: contentType,
            },

            partSize: PartSize * 1024 * 1024
        });

        result.on("httpUploadProgress", (Progress) => {
            console.log(
                `${(Progress.loaded as number) / (Progress.total as number) * 100}&`
            );
        });

        await result.done();

        return {
            key: key
        };
    }

    //////////////////////////////////////////////////////////////////////////////////////////////

    async getFile({
        Bucket = env.aws_bucket_name,
        Key
    }: {
        Bucket?: string,
        Key: string
    }) {

        const file = await new GetObjectCommand({
            Bucket,
            Key
        });

        return await this.client.send(file);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////

    async createPreSignedUrl({
        Bucket = env.aws_bucket_name,
        path = "general",
        ContentType,
        Key,
        Expires = 60 * 2,
        Originalname
    }: {

        Bucket?: string,
        Key?: string,
        Expires?: number,
        Originalname: string,
        path?: string,
        ContentType: string

    }): Promise<string> {

        const key = `socialMedia/${path}/${Math.round(Math.random() * 1e9)}-${Originalname}`;

        const result = new PutObjectCommand({
            Bucket,
            Key: key,
            ContentType
        });

        const url = await getSignedUrl(this.client, result, {
            expiresIn: Expires
        });

        return url;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////

    async deleteFile({
        Bucket = env.aws_bucket_name,
        Key,
    }: {
        Bucket?: string,
        Key: string,
    }) {

        const result = await new DeleteObjectCommand({
            Bucket,
            Key
        });

        return this.client.send(result);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////

}

export const sS3_Service = new S3_service();