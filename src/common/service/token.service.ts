import { env } from "../../config/env.service"
import jwt, { JwtPayload } from "jsonwebtoken"
import { Bad_Request_Exception } from "../excaptions/error.exceptions"

export class TokenService {

    constructor() { }

    generateToken(user: any) {

        let signature = undefined
        let audience = undefined
        let refreshSignature = undefined

        switch (user.role) {

            case 0:
                signature = env.jwt_key_admin
                audience = "Admin"
                refreshSignature = env.admin_refresh_token
                break

            default:
                signature = env.jwt_key_user
                audience = "User"
                refreshSignature = env.user_refresh_token
                break
        }

        let accessToken = jwt.sign(
            { id: user._id },
            signature as string,
            {
                audience,
                expiresIn: "30min"
            }
        )

        let refreshToken = jwt.sign(
            { id: user._id },
            refreshSignature as string,
            {
                audience,
                expiresIn: "1y"
            }
        )

        return {
            accessToken,
            refreshToken
        }
    }

    decodeToken(token: string) {

        let decoded = jwt.decode(token) as JwtPayload

        if (!decoded) {
            throw new Bad_Request_Exception("Token not valid")
        }

        let signature = undefined

        switch (decoded.aud) {

            case "Admin":
                signature = env.jwt_key_admin
                break

            case "User":
                signature = env.jwt_key_user
                break

            default:
                throw new Bad_Request_Exception("Invalid audience")
        }

        try {

            let decodedData = jwt.verify(
                token,
                signature as string
            )

            return decodedData

        } catch (error) {

            throw new Bad_Request_Exception(
                "Token not valid",
                error
            )
        }
    }

    decodeRefreshToken(RefreshToken: string) {

        let decoded = jwt.decode(RefreshToken) as JwtPayload

        if (!decoded) {
            throw new Bad_Request_Exception("Token not valid")
        }

        let signature = undefined

        switch (decoded.aud) {

            case "Admin":
                signature = env.admin_refresh_token
                break

            case "User":
                signature = env.user_refresh_token
                break

            default:
                throw new Bad_Request_Exception("Invalid audience")
        }

        try {

            let decodedData = jwt.verify(
                RefreshToken,
                signature as string
            )

            return decodedData

        } catch (error) {

            throw new Bad_Request_Exception(
                "Refresh Token not valid",
                error
            )
        }
    }
}