const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const stcPath = path.resolve(__dirname, "src");

const config = {
  entry: [
    // "react-hot-loader/patch",
    stcPath + "/index.tsx"
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      ".tsx",
      ".ts",
      ".js"
    ],
  },
  devServer: {
    "static": {
      directory: "./dist"
    }
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: stcPath + "/index.html" }],
    }),
    new CleanWebpackPlugin()
  ]
};

module.exports = config;