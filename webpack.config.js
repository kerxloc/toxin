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
    main: "./src/page/main/main.js",
    rooms: "./src/page/rooms/rooms.js",
    "room-details": "./src/page/room-details/room-details.js",
    "form-elements": "./src/page/form-elements/form-elements.js"
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
      template: "./src/page/main/main.pug",
      chunks: ["main"]
    }),
    new HtmlWebpackPlugin({
      filename: "rooms.html",
      template: "./src/page/rooms/rooms.pug",
      chunks: ["rooms"]
    }),
    new HtmlWebpackPlugin({
      filename: "room-details.html",
      template: "./src/page/room-details/room-details.pug",
      chunks: ["room-details"]
    }),
    new HtmlWebpackPlugin({
      filename: "form-elements.html",
      template: "./src/page/form-elements/form-elements.pug",
      chunks: ["form-elements"]
    }),
    new HtmlWebpackPlugin({
      filename: "cards.html",
      template: "./src/page/cards/cards.pug"
    }),
    new HtmlWebpackPlugin({
      filename: "registration.html",
      template: "./src/page/registration/registration.pug"
    }),
    new HtmlWebpackPlugin({
      filename: "auth.html",
      template: "./src/page/auth/auth.pug"
    })
  ]
};
