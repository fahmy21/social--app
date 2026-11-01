import { GraphQLError } from "graphql";

interface AError {
    status: number;
    message: string;
    cause?: unknown;
}
//////////////////////////////////////////////////////////////////////////////////

export class Application_Exception extends Error implements AError {
    constructor(
        message: string,
        public status: number,
        cause?: unknown
    ) {
        super(message, { cause })
    }
}

//////////////////////////////////////////////////////////////////////////////////
export const MapGraphQLError = (error: Application_Exception) => {
    throw new GraphQLError(error.message, { extensions: { statusCode: error.status,cause: error.cause || [] } })
}
//////////////////////////////////////////////////////////////////////////////////
export class Bad_Request_Exception extends Application_Exception {

    constructor(message: string, cause?: unknown) {
        super(message, 400, cause)
    }

}
//////////////////////////////////////////////////////////////////////////////////

export class Confiliect_Exception extends Application_Exception {

    constructor(message: string, cause?: unknown) {
        super(message, 409, cause)
    }

}
//////////////////////////////////////////////////////////////////////////////////

export class Not_Found_Exception extends Application_Exception {

    constructor(message: string, cause?: unknown) {
        super(message, 404, cause)
    }

}