// package: user
// file: proto/user.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GetProfileRequest extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetProfileRequest.AsObject;
    static toObject(
        includeInstance: boolean,
        msg: GetProfileRequest,
    ): GetProfileRequest.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
        [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
        message: GetProfileRequest,
        writer: jspb.BinaryWriter,
    ): void;
    static deserializeBinary(bytes: Uint8Array): GetProfileRequest;
    static deserializeBinaryFromReader(
        message: GetProfileRequest,
        reader: jspb.BinaryReader,
    ): GetProfileRequest;
}

export namespace GetProfileRequest {
    export type AsObject = {};
}

export class GetProfileResponse extends jspb.Message {
    getName(): string;
    setName(value: string): GetProfileResponse;
    getEmail(): string;
    setEmail(value: string): GetProfileResponse;
    getPicture(): string;
    setPicture(value: string): GetProfileResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetProfileResponse.AsObject;
    static toObject(
        includeInstance: boolean,
        msg: GetProfileResponse,
    ): GetProfileResponse.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
        [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
        message: GetProfileResponse,
        writer: jspb.BinaryWriter,
    ): void;
    static deserializeBinary(bytes: Uint8Array): GetProfileResponse;
    static deserializeBinaryFromReader(
        message: GetProfileResponse,
        reader: jspb.BinaryReader,
    ): GetProfileResponse;
}

export namespace GetProfileResponse {
    export type AsObject = {
        name: string;
        email: string;
        picture: string;
    };
}
