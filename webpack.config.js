const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    }),
    new HtmlWebpackPlugin({
      filename: 'page.html',
      template: 'src/pages/page.pug',
      chunks: ['pageEntry']
    }),
    new MiniCssExtractPlugin({
      filename: "[name].build.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["pug-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          {
            loader: 'postcss-loader',
            options: { config: { path: 'src/js/postcss.config.js' } }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
};
