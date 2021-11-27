const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const dotenv = require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});

const cwd = process.cwd();

// TODO: It should be turn `webpack.config.dev.js` in the future
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  context: path.resolve(cwd, './'),
  entry: './src/index.tsx',
  output: {
    path: path.join(cwd, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory'],
      },
    ],
  },
  devServer: {
    port: process.env.PORT,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [
    // new Dotenv({
    //   path: './.env',
    //   safe: true,
    //   ignoreStub: true,
    // }),
    // TODO: It's working but should I do it or should I use dotenv-webpack package?
    // See this issue for more details: https://github.com/mrsteele/dotenv-webpack/issues/271
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
    new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
