import * as dotenv from "dotenv";
import * as jwksClient from "jwks-rsa";

// enables env variables
dotenv.config();

// for fetching auth's public keys
// will verify incoming tokens
const client: jwksClient.JwksClient = jwksClient.default({
    jwksUri: `{process.env["ISSUER_BASE_URL"]}/.well-known/jwks.json`,
});
