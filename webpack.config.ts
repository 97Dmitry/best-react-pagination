const path = require("path");
import { Configuration } from "webpack";
const nodeExternals = require("webpack-node-externals");
const fs = require("fs");

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
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: [nodeExternals()],
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.compile.tap("Copy file", () => {
          fs.copyFile(demoPath + "/src/pagination/index.tsx", libPath + "/index.tsx", (err: any) => {
            if (err) throw err;
            console.log("Pagination was copied to ", libPath);
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
