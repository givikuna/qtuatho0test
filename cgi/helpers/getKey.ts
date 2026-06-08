import * as jwt from "jsonwebtoken";
import * as jwksClient from "jwks-rsa";

export function getKey(
    header: jwt.JwtHeader,
    callback: jwt.SigningKeyCallback,
    client: jwksClient.JwksClient,
): void {
    client.getSigningKey(
        header.kid,
        (err: Error | null, key: jwksClient.SigningKey | undefined): void => {
            if (err || !key) {
                callback(err || new Error("Unable to retrieve signing key"));
                return;
            }
            callback(null, key.getPublicKey());
        },
    );
}
