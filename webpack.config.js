const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  devServer: {
    port: 3000,
    clientLogLevel: "silent",
    overlay: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug"
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["pug-loader"]
      }
    ]
  }
};
