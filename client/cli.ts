import * as grpc from "@grpc/grpc-js";
import * as dotenv from "dotenv";

import { UserServiceClient } from "../src/proto/proto/user_grpc_pb";
import {
    GetProfileRequest,
    GetProfileResponse,
} from "../src/proto/proto/user_pb";

dotenv.config();

const SRVR: string =
    process.env["BASE_URL"] || `localhost:${process.env["PORT"] || 3000}`;
const accessToken: string | undefined = process.env["ACCESS_TOKEN"];

if (!accessToken) {
    console.error("no ACCESS_TOKEN env var");
    process.exit(1);
}

const client: UserServiceClient = new UserServiceClient(
    SRVR,
    grpc.credentials.createInsecure(),
);

const metadata: grpc.Metadata = new grpc.Metadata();
metadata.add("authorization", `Bearer ${accessToken}`);

const request: GetProfileRequest = new GetProfileRequest();

client.getProfile(
    request,
    metadata,
    (error: grpc.ServiceError | null, response: GetProfileResponse): void => {
        if (error) {
            console.error(error.message);
            process.exit(1);
        }

        console.log("Profile:");
        console.log("  Name:", response.getName());
        console.log("  Email:", response.getEmail());
        console.log("  Picture:", response.getPicture());
        process.exit(0);
    },
);
