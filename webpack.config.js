const isProd = process.env.NODE_ENV === "production";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: isProd ? "production" : "development", //模式
  entry: {
    app: "./src/app.tsx",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        include: path.resolve(__dirname, "./src"),
      },
      {
        test: /\.less$/i,
        include: path.resolve(__dirname, "./src"),
        // style-loader从 JS 中创建样式节点 css-loader转化 CSS 为 CommonJS  less-loader编译 Less 为 CSS
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"), //指定模板页面
      // filename: "index.html", //打包生成页面的名称，默认index.html
    }),
    !isProd && new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    alias: {
      type: path.resolve(__dirname, "src/@type/"),
      component: path.resolve(__dirname, "src/component/"),
    }, // 别名
    extensions: [".tsx", ".ts", ".js"], //解析顺序
  },
  devServer: {
    host: "0.0.0.0",
    port: 9000,
    inline: true,
    open: true,
    hot: true,
    historyApiFallback: true,
    headers: {
      "cache-control": "no-cache",
      pragma: "no-cache",
    },
    proxy: {},
  },
};
