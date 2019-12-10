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
  entry: {
    index: "./src/index.js",
    rooms: "./src/rooms.js",
    "room-details": "./src/room-details.js",
    "form-elements": "./src/form-elements.js"
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
              plugins: [autoprefixer()]
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
      template: "./src/page/index.pug",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      filename: "rooms.html",
      template: "./src/page/rooms.pug",
      chunks: ["rooms"]
    }),
    new HtmlWebpackPlugin({
      filename: "room-details.html",
      template: "./src/page/room-details.pug",
      chunks: ["room-details"]
    }),
    new HtmlWebpackPlugin({
      filename: "form-elements.html",
      template: "./src/page/form-elements.pug",
      chunks: ["form-elements"]
    }),
    new HtmlWebpackPlugin({
      filename: "cards.html",
      template: "./src/page/cards.pug"
    })
  ]
};
