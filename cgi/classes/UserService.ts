import * as grpc from "@grpc/grpc-js";
import * as jwksClient from "jwks-rsa";
import * as jwt from "jsonwebtoken";

import { IUserServiceServer } from "../../src/proto/proto/user_grpc_pb";
import {
    GetProfileRequest,
    GetProfileResponse,
} from "../../src/proto/proto/user_pb";

import { verifyToken } from "../helpers/verifyToken";

export class UserService implements IUserServiceServer {
    private client: jwksClient.JwksClient;
    private CLIENT_ID: string;
    private ISSUER_BASE_URL: string;

    constructor(
        client: jwksClient.JwksClient,
        CLIENT_ID: string,
        ISSUER_BASE_URL: string,
    ) {
        this.client = client;
        this.CLIENT_ID = CLIENT_ID;
        this.ISSUER_BASE_URL = ISSUER_BASE_URL;
    }

    async getProfile(
        call: grpc.ServerUnaryCall<GetProfileRequest, GetProfileResponse>,
        callback: grpc.sendUnaryData<GetProfileResponse>,
    ) {
        try {
            const authHeader: grpc.MetadataValue[] =
                call.metadata.get("authorization");

            if (!authHeader || authHeader.length === 0) {
                return callback(
                    {
                        code: grpc.status.UNAUTHENTICATED,
                        message: "missing authorization metadata",
                    },
                    null,
                );
            }

            const token: string = authHeader[0]
                .toString()
                .replace("Bearer ", "");

            const decoded: jwt.JwtPayload = await verifyToken(
                token,
                this.client,
                this.CLIENT_ID,
                this.ISSUER_BASE_URL,
            );

            const response: GetProfileResponse = new GetProfileResponse();

            response.setName(decoded["name"] || "unknown");
            response.setEmail(decoded["email"] || "unknown");
            response.setPicture(decoded["picture"] || "unknown");

            callback(null, response);
        } catch (err: unknown) {
            console.error("Auth Error:", err);
            callback(
                {
                    code: grpc.status.UNAUTHENTICATED,
                    message: "invalid or expired token",
                },
                null,
            );
        }
    }
}
