// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_user_pb = require('../proto/user_pb.js');

function serialize_user_GetProfileRequest(arg) {
  if (!(arg instanceof proto_user_pb.GetProfileRequest)) {
    throw new Error('Expected argument of type user.GetProfileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_GetProfileRequest(buffer_arg) {
  return proto_user_pb.GetProfileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetProfileResponse(arg) {
  if (!(arg instanceof proto_user_pb.GetProfileResponse)) {
    throw new Error('Expected argument of type user.GetProfileResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_GetProfileResponse(buffer_arg) {
  return proto_user_pb.GetProfileResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  getProfile: {
    path: '/user.UserService/GetProfile',
    requestStream: false,
    responseStream: false,
    requestType: proto_user_pb.GetProfileRequest,
    responseType: proto_user_pb.GetProfileResponse,
    requestSerialize: serialize_user_GetProfileRequest,
    requestDeserialize: deserialize_user_GetProfileRequest,
    responseSerialize: serialize_user_GetProfileResponse,
    responseDeserialize: deserialize_user_GetProfileResponse,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService, 'UserService');
