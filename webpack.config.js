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
    registration: "./src/page/registration/registration.js",
    auth: "./src/page/auth/auth.js",
    cards: "./src/page/cards/cards.js",
    "colors-and-type": "./src/page/colors-and-type/colors-and-type.js",
    "room-details": "./src/page/room-details/room-details.js",
    "form-elements": "./src/page/form-elements/form-elements.js",
    "headers-and-footers":
      "./src/page/headers-and-footers/headers-and-footers.js"
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
      template: "./src/page/cards/cards.pug",
      chunks: ["cards"]
    }),
    new HtmlWebpackPlugin({
      filename: "registration.html",
      template: "./src/page/registration/registration.pug",
      chunks: ["registration"]
    }),
    new HtmlWebpackPlugin({
      filename: "auth.html",
      template: "./src/page/auth/auth.pug",
      chunks: ["auth"]
    }),
    new HtmlWebpackPlugin({
      filename: "colors-and-type.html",
      template: "./src/page/colors-and-type/colors-and-type.pug",
      chunks: ["colors-and-type"]
    }),
    new HtmlWebpackPlugin({
      filename: "headers-and-footers.html",
      template: "./src/page/headers-and-footers/headers-and-footers.pug",
      chunks: ["headers-and-footers"]
    })
  ]
};
