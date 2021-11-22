require('dotenv').config();

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotEnv = require('dotenv-webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const cwd = process.cwd();

console.log(process.env);

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
    open: true,
    compress: true,
  },
  plugins: [
    new dotEnv({
      path: './.env',
      safe: true,
    }),
    new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
