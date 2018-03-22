/* ------------------------------------------
   Webpack Production configuration
--------------------------------------------- */
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const { rules, resolve } = require('./webpack.common');
const config = require('../config');

const { env, publicPath, utils, paths, globals } = config;

module.exports = {
  entry: utils.paths.entry(),
  mode: env,
  devtool: false,
  output: {
    publicPath: publicPath,
    path: utils.paths.distStatic(),
    filename: '[name].[hash].js',
    chunkFilename: `${paths.static}/js/[name].[chunkhash].chunk.js`,
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
    // new InterpolateHtmlPlugin(indexReplace), // TODO @Nico : Investigate bug here
    new ExtractTextPlugin('global.[hash].css'),
    new webpack.DefinePlugin(globals),
    new HtmlWebpackPlugin({
      filename: utils.paths.dist('index.html'),
      template: utils.paths.public('index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new CaseSensitivePathsPlugin(),
    new UglifyJSPlugin(),
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

