const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: './loaders/test-loader.js',
      },
      {
        test: /\.js$/,
        loader: './loaders/pitch-loader.js',
      },
      {
        test: /\.js$/,
        use: ['./loaders/sync-loader.js', './loaders/async-loader.js'],
      },
      {
        test: /\.js$/,
        loader: './loaders/raw-loader.js',
      },
      {
        test: /\.js$/,
        loader: './loaders/custom/clean-log-loader.js',
      },
      {
        test: /\.js$/,
        loader: './loaders/custom/banner-loader/banner-loader.js',
        options: {
          author: 'Paco',
        },
      },
      {
        test: /\.js$/,
        loader: './loaders/custom/babel-loader/babel-loader.js',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
  ],
  mode: 'development',
};
