const path = require("path");
import { Configuration } from "webpack";
const nodeExternals = require("webpack-node-externals");
const ncp = require("ncp").ncp;
const fs = require("fs-extra");

const libPath = path.resolve(__dirname, "lib");
const distPath = path.resolve(__dirname, "dist");
const demoPath = path.resolve(__dirname, "demo");

const config: Configuration = {
  entry: path.resolve(libPath, "index.tsx"),
  output: {
    path: distPath,
    filename: "index.js",
    library: "best-react-pagination",
    libraryTarget: "umd",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: [nodeExternals()],
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.beforeCompile.tapPromise("Copy file", () => {
          return new Promise<void>((resolve, reject) => {
            fs.emptyDirSync(libPath);
            ncp(demoPath + "/src/Pagination/", libPath, (err: any) => {
              if (err) {
                reject(err);
              }
              console.log("Pagination was copied to ", libPath);
              resolve();
            });
          });
        });
      },
    },
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },
};

export default config;
