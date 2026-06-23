import * as grpc from "@grpc/grpc-js";
import * as jwksClient from "jwks-rsa";
import * as jwt from "jsonwebtoken";

import { IUserServiceServer } from "../../../src/proto/user_grpc_pb";
import {
    GetProfileRequest,
    GetProfileResponse,
} from "../../../src/proto/user_pb";

import { verifyToken } from "../../helpers/verifyToken";

export class IUserServiceServerFactory {
    public static createUserService(
        client: jwksClient.JwksClient,
        CLIENT_ID: string,
        ISSUER_BASE_URL: string,
    ): IUserServiceServer {
        return {
            getProfile: async (
                call: grpc.ServerUnaryCall<
                    GetProfileRequest,
                    GetProfileResponse
                >,
                callback: grpc.sendUnaryData<GetProfileResponse>,
            ): Promise<void> => {
                try {
                    const authHeader: grpc.MetadataValue[] =
                        call.metadata.get("authorization");

                    if (!authHeader || authHeader.length === 0) {
                        return callback({
                            code: grpc.status.UNAUTHENTICATED,
                            message: "missing authorization metadata",
                        });
                    }

                    const token: string = authHeader[0]
                        .toString()
                        .replace("Bearer ", "");

                    const decoded: jwt.JwtPayload = await verifyToken(
                        token,
                        client,
                        CLIENT_ID,
                        ISSUER_BASE_URL,
                    );

                    const response: GetProfileResponse =
                        new GetProfileResponse();

                    response.setName(decoded["name"] || "unknown");
                    response.setEmail(decoded["email"] || "unknown");
                    response.setPicture(decoded["picture"] || "unknown");

                    callback(null, response);
                } catch (e: unknown) {
                    console.error(e);

                    callback(
                        {
                            code: grpc.status.UNAUTHENTICATED,
                            message: "invalid or expired token",
                        },
                        null,
                    );
                }
            },
        };
    }
}
