{
  description = "Qt-auth0 test flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      utils,
    }:
    utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          nativeBuildInputs = with pkgs; [
            cmake
            ninja
            pkg-config
            qt6.wrapQtAppsHook
            bun
          ];

          buildInputs = with pkgs; [
            qt6.qtbase
            qt6.qtnetworkauth
            qt6.qtwebengine

            openssl
            curl
          ];

          shellHook = ''
            echo "Qt C++ Dev Shell Enabled"

            export CMAKE_GENERATOR="Ninja"

            export QT_QPA_PLATFORM_PLUGIN_PATH="${pkgs.qt6.qtbase}/${pkgs.qt6.qtbase.qtPluginPrefix}/platforms"
            export QML2_IMPORT_PATH="${pkgs.qt6.qtdeclarative}/${pkgs.qt6.qtbase.qtQmlPrefix}"

            echo "Qt Network Auth & WebEngine variants loaded."
          '';
        };
      }
    );
}
