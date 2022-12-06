const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TestPlugin = require('./plugins/test-plugin');
const BannerWebpackPlugin = require('./plugins/custom/banner-webpack-plugin');
const CleanWebpackPlugin = require('./plugins/custom/clean-webpack-plugin');
const AnalyzeWebpackPlugin = require('./plugins/custom/analyze-webpack-plugin');
const InlineChunkWebpackPlugin = require('./plugins/custom/inline-chunk-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    // clean: true,
  },
  module: {
    rules: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new TestPlugin(),
    new BannerWebpackPlugin({
      author: 'Pacoooo',
    }),
    new CleanWebpackPlugin(),
    new AnalyzeWebpackPlugin(),
    new InlineChunkWebpackPlugin([/runtime(.*)\.js/]),
  ],
  optimization: {
    // 单入口的代码分割配置，多入口的配置请参考code-split
    splitChunks: {
      chunks: 'all', // 对所有模块都进行分割
    },
    // 提取runtime文件
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
    },
  },
  mode: 'production',
};
