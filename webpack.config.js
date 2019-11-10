const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  devServer: {
    contentBase: "./dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer({
                  browsers: ["ie >= 8", "last 4 version"]
                })
              ]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.pug$/,
        loaders: [
          "html-loader",
          { loader: "pug-html-loader", options: { pretty: true } }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/page/index.pug"
    }),
    new HtmlWebpackPlugin({
      filename: "rooms.html",
      template: "./src/page/rooms.pug"
    })
  ]
};
