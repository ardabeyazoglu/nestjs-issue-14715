const { composePlugins, withNx } = require("@nx/webpack");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const swcDefaultConfig = require("@nestjs/cli/lib/compiler/defaults/swc-defaults").swcDefaultsFactory().swcOptions;
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const WarningsToErrorsPlugin = require("warnings-to-errors-webpack-plugin");

// Set true if you don't want type checking (may lose too much speed)
// false = adds ForkTsCheckerWebpackPlugin { options: [Object] } to plugin list
const skipTypeChecking = true;

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx({
    skipTypeChecking: skipTypeChecking,
    target: "node",
  }), 
  (config) => {
    const plugins = [];
    for (const p of config.plugins) {
      if (p.constructor.name === "ForkTsCheckerWebpackPlugin") {
        plugins.push(
          // default one from nx was not using async: true (not sure if it's needed)
          new ForkTsCheckerWebpackPlugin({
            async: true,
            typescript: {
              memoryLimit: 2048,
              configFile: "./tsconfig.app.json",
              mode: "write-references",
            },
          }),
        );
      }
      else {
        plugins.push(p);
      }
    }

    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
              loader: "swc-loader",
              options: {
                ...swcDefaultConfig,
              },
            },
          },
          config.module.rules[0],
          config.module.rules[1],
          {
            ...config.module.rules[2],
            test: /\.jsx?$/,
          },
        ],
      },
      entry: ["webpack/hot/poll?100", ...config.entry.main],
      externals: [
        nodeExternals({
          main: "./src/main.ts",
          tsConfig: "./tsconfig.app.json",
          assets: [],
          optimization: false,
          outputHashing: "none",
          sourceMap: true,
          skipTypeChecking: true,
          allowlist: ["webpack/hot/poll?100"],
          debug: true,
          verbose: true
        }),
      ],
      plugins: [
        ...plugins,
        new WarningsToErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin({}),
        new webpack.WatchIgnorePlugin({
          paths: [/\.js$/, /\.d\.ts$/],
        }),
      ],
    };
  });
