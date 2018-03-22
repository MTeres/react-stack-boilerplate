/* ------------------------------------------
 Webpack Development configuration
 --------------------------------------------- */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const { rules, resolve } = require('./webpack.common');
const config = require('../config');

const { env, publicPath, utils, paths, globals, devServer } = config;

module.exports = {
  entry: [
    `webpack-dev-server/client?http://${devServer.host}:${devServer.port}`,
    'webpack/hot/dev-server',
    utils.paths.entry(),
  ],
  mode: env,
  devtool: 'inline-source-map',
  output: {
    publicPath: publicPath,
    path: utils.paths.distStatic(),
    filename: '[name].js',
    chunkFilename: `${paths.static}/js/[name].chunk.js`,
    pathinfo: true,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    ...resolve(),
  },
  module: {
    rules: [
      ...rules(env),
    ],
  },
  plugins: [
    new webpack.DefinePlugin(globals),
    new HtmlWebpackPlugin({
      template: utils.paths.public('index.html'),
      minify: false,
    }),
    new CaseSensitivePathsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    hints: false,
  },
};
