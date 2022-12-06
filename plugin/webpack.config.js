const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TestPlugin = require('./plugins/test-plugin');
const BannerWebpackPlugin = require('./plugins/custom/banner-webpack-plugin');
const CleanWebpackPlugin = require('./plugins/custom/clean-webpack-plugin');
const AnalyzeWebpackPlugin = require('./plugins/custom/analyze-webpack-plugin');

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
  ],
  mode: 'production',
};
