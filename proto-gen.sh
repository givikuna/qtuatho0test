#!/usr/bin/env bash
grpc_tools_node_protoc \
  --proto_path=proto \
  --js_out=import_style=commonjs,binary:./src/proto \
  --grpc_out=grpc_js:./src/proto \
  --plugin=protoc-gen-grpc=$(which grpc_tools_node_protoc_plugin) \
  --plugin=protoc-gen-ts=$(which protoc-gen-ts) \
  --ts_out=grpc_js:./src/proto \
  user.proto
