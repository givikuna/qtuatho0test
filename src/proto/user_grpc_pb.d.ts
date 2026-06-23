// package: user
// file: user.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as user_pb from "./user_pb";

interface IUserServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getProfile: IUserServiceService_IGetProfile;
}

interface IUserServiceService_IGetProfile extends grpc.MethodDefinition<user_pb.GetProfileRequest, user_pb.GetProfileResponse> {
    path: "/user.UserService/GetProfile";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.GetProfileRequest>;
    requestDeserialize: grpc.deserialize<user_pb.GetProfileRequest>;
    responseSerialize: grpc.serialize<user_pb.GetProfileResponse>;
    responseDeserialize: grpc.deserialize<user_pb.GetProfileResponse>;
}

export const UserServiceService: IUserServiceService;

export interface IUserServiceServer extends grpc.UntypedServiceImplementation {
    getProfile: grpc.handleUnaryCall<user_pb.GetProfileRequest, user_pb.GetProfileResponse>;
}

export interface IUserServiceClient {
    getProfile(request: user_pb.GetProfileRequest, callback: (error: grpc.ServiceError | null, response: user_pb.GetProfileResponse) => void): grpc.ClientUnaryCall;
    getProfile(request: user_pb.GetProfileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.GetProfileResponse) => void): grpc.ClientUnaryCall;
    getProfile(request: user_pb.GetProfileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.GetProfileResponse) => void): grpc.ClientUnaryCall;
}

export class UserServiceClient extends grpc.Client implements IUserServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getProfile(request: user_pb.GetProfileRequest, callback: (error: grpc.ServiceError | null, response: user_pb.GetProfileResponse) => void): grpc.ClientUnaryCall;
    public getProfile(request: user_pb.GetProfileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.GetProfileResponse) => void): grpc.ClientUnaryCall;
    public getProfile(request: user_pb.GetProfileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.GetProfileResponse) => void): grpc.ClientUnaryCall;
}
