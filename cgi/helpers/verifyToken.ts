import * as jwt from "jsonwebtoken";
import * as jwksClient from "jwks-rsa";

import { getKey } from "./getKey";

export function verifyToken(
    token: string,
    client: jwksClient.JwksClient,
    CLIENT_ID: string,
    ISSUER_BASE_URL: string,
): Promise<jwt.JwtPayload> {
    return new Promise(
        (
            resolve: (
                value: jwt.JwtPayload | PromiseLike<jwt.JwtPayload>,
            ) => void,
            reject: (reason?: any) => void,
        ): void => {
            jwt.verify(
                token,
                (header, callback): void => getKey(header, callback, client),
                {
                    audience: CLIENT_ID,
                    issuer: `${ISSUER_BASE_URL}/`,
                    algorithms: ["RS256"],
                },
                (err, decoded): void => {
                    if (err) reject(err);
                    else resolve(decoded as jwt.JwtPayload);
                },
            );
        },
    );
}
