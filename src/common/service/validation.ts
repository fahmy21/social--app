import { NextFunction, Request, Response } from "express";
import { Bad_Request_Exception, MapGraphQLError } from "../excaptions/error.exceptions";
import { ZodType } from "zod";
import { GraphQLError } from "graphql";

type validationKey = "body" | "params" | "query" | "headers";

type validationSchema = Partial<Record<validationKey, ZodType>>;

export const Validation = (schema: validationSchema) => {

    return (req: Request, res: Response, next: NextFunction) => {

        const validationError = [];

        for (const key of Object.keys(schema) as validationKey[]) {

            if (!schema[key]) {
                throw new Bad_Request_Exception("validation error");
            }

            const value = schema[key].safeParse(req[key]);

            if (!value.success) {

                validationError.push({
                    key,
                    issue: value.error.issues
                });

            }

        }

        if (validationError.length > 0) {

            throw new Bad_Request_Exception(
                "validation error",
                validationError
            );

        }

        next();
    };
};
//////////////////////////////////////////////////////////////////////////////////////////
export const GQLValidation = (schema: ZodType, args: any) => {
    const validationResult = schema.safeParse(args)

    // console.log(validationResult);
    let Error_Message = []

    if (!validationResult.success) {
        Error_Message.push(validationResult.error.issues)
        console.log(Error_Message);

        throw new GraphQLError("validation error", { extensions: { error: Error_Message } });
    }
    return true
}