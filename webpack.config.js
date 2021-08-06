const isProd = process.env.NODE_ENV === 'production';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin'); // 显示构建进程

module.exports = {
  mode: isProd ? 'production' : 'development', //模式
  entry: {
    app: './src/app.tsx',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: isProd ? 'none' : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path.resolve(__dirname, './src'),
      },
      {
        test: /\.(css|less)$/i,
        include: path.resolve(__dirname, './src'),
        // style-loader从 JS 中创建样式节点 css-loader转化 CSS 为 CommonJS  less-loader编译 Less 为 CSS
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'less-loader'],
      },
      {
        // webpack5自带资源模块 asset/resource => file-loader asset/inline => url-loader
        test: /\.(png|jpeg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
      {
        test: /\.svg/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'), //指定模板页面
      // filename: "index.html", //打包生成页面的名称，默认index.html
    }),
    !isProd && new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
    new ProgressBarWebpackPlugin(),
  ],
  resolve: {
    alias: {
      types: path.resolve(__dirname, 'src/types/'),
      component: path.resolve(__dirname, 'src/component/'),
      container: path.resolve(__dirname, 'src/container/'),
      api: path.resolve(__dirname, 'src/api/'),
      assets: path.resolve(__dirname, 'src/assets/'),
    }, // 别名
    extensions: ['.tsx', '.ts', '.js'], //解析顺序
  },
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    inline: true,
    // open: true,
    hot: true,
    historyApiFallback: true,
    headers: {
      'cache-control': 'no-cache',
      pragma: 'no-cache',
    },
    proxy: {},
  },
};
