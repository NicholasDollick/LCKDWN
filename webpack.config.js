

var path = require("path");
var config = {
  entry: ["./index.tsx"],
  output: {
    path: path.join(__dirname, '/build'),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },{
        test: /\.scss$/,
        loader: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};

module.exports = config;