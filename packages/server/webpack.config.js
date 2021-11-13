const path = require('path');
const webpack = require('webpack');
const WebpackNodeExternals = require('webpack-node-externals');

const ReloadServerPlugin = require('./webpack/ReloadServerPlugin');

const cwd = process.cwd();

module.exports = {
  target: 'node',
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  entry: {
    server: ['./src/index.ts'],
  },
  output: {
    path: path.resolve('build'),
    filename: 'server.js',
  },
  node: {
    __dirname: true,
  },
  externals: [
    WebpackNodeExternals({
      allowlist: ['webpack/hot/poll?1000'],
    }),
    WebpackNodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
      allowlist: [/@fakeddit/],
    }),
  ],
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)?$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: ['/node_modules/'],
        include: [path.join(cwd, 'src'), path.join(cwd, '../')],
      },
    ],
  },
  plugins: [
    new ReloadServerPlugin({
      script: path.resolve('build', 'server.js'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
