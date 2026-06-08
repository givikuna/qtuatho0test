import * as dotenv from "dotenv";
import * as jwksClient from "jwks-rsa";
import * as grpc from "@grpc/grpc-js";

import { UserServiceService } from "../src/proto/proto/user_grpc_pb";

import { IUserServiceServerFactory } from "./classes/factories/IUserServiceServerFactory";

dotenv.config();

const PORT = process.env["PORT"] || 3000;

// for fetching auth's public keys
// will verify incoming tokens
const client: jwksClient.JwksClient = jwksClient.default({
    jwksUri: `${process.env["ISSUER_BASE_URL"]}/.well-known/jwks.json`,
});

const server: grpc.Server = new grpc.Server();

server.addService(
    UserServiceService,
    IUserServiceServerFactory.createUserService(
        client,
        process.env["CLIENT_ID"]!,
        process.env["ISSUER_BASE_URL"]!,
    ),
);

server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`running on ${port}`);
    },
);
