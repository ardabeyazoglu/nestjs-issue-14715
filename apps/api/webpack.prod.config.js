const { composePlugins, withNx } = require("@nx/webpack");
const { NxAppWebpackPlugin } = require("@nx/webpack/app-plugin");
const { join } = require("path");
const WarningsToErrorsPlugin = require("warnings-to-errors-webpack-plugin");

// skipTypeChecking: false adds ForkTsCheckerWebpackPlugin for type checks and takes too long
const skipTypeChecking = true;

module.exports = composePlugins(
  withNx({ 
    skipTypeChecking: skipTypeChecking,
    target: "node",
  }), 
  (config) => {
    const plugins = [
      new NxAppWebpackPlugin({
        compiler: "swc",
        main: "./src/main.ts",
        tsConfig: "./tsconfig.app.json",
        assets: [],
        memoryLimit: 2048,
        outputHashing: "none",
        optimization: false,
        generatePackageJson: true,
        sourceMap: true,
        skipTypeChecking: skipTypeChecking,
        progress: true,
        verbose: false
      }),
      new WarningsToErrorsPlugin()
    ];

    return {
      ...config,
      mode: "production",
      devtool: "source-map",
      plugins: [...config.plugins, ...plugins],
      target: ["node22.11"],
      output: {
        path: join(__dirname, "../../dist/apps/api"),
        environment: {
          arrowFunction: true,
          const: true,
          destructuring: true,
          optionalChaining: true,
          bigIntLiteral: true,
          templateLiteral: true,
          asyncFunction: true,
          forOf: true,
          dynamicImport: true,
        },
      }
    };
  });
