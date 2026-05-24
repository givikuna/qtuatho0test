{
  description = "A Nix Flake for a Qt C++ Frontend with Auth0 integration";

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
          ];

          buildInputs = with pkgs; [
            qt6.qtbase
            qt6.qtnetworkauth
            qt6.qtwebengine

            openssl
            curl
          ];

          shellHook = ''
            echo "⚡ Qt C++ Dev Shell Enabled ⚡"

            # Export standard build environments
            export CMAKE_GENERATOR="Ninja"

            # Crucial fixes for Qt applications running out of build trees on Linux
            export QT_QPA_PLATFORM_PLUGIN_PATH="${pkgs.qt6.qtbase}/${pkgs.qt6.qtbase.qtPluginPrefix}/platforms"
            export QML2_IMPORT_PATH="${pkgs.qt6.qtdeclarative}/${pkgs.qt6.qtbase.qtQmlPrefix}"

            echo "Qt Network Auth & WebEngine variants loaded."
          '';
        };
      }
    );
}
