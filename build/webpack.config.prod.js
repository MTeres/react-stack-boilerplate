/* ------------------------------------------
   Webpack Production configuration
--------------------------------------------- */
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const { rules, resolve } = require('./webpack.common');
const config = require('./config');
const logger = require('./utils/logger');

const { env, publicPath, utils, globals } = config;

module.exports = {
  entry: [
    path.resolve(__dirname, './utils/polyfills'),
    utils.paths.productionEntry(),
  ],
  mode: env,
  devtool: false,
  output: {
    publicPath: publicPath,
    path: utils.paths.distStatic(),
    filename: `js/[name].[hash].js`,
    chunkFilename: `js/[name].[chunkhash].chunk.js`,
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
    new ProgressBarPlugin({
      format: logger.webpackProgressBarFormat(),
      width: 42,
      clear: false,
      customSummary: logger.webpackProgressBarSummary,
      summary: false,
    }),
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
    new webpack.DefinePlugin(globals),
    new CaseSensitivePathsPlugin(),
    new UglifyJSPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
    }),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     minSize: 30000,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     name: true,
  //     cacheGroups: {
  //       styles: {
  //         name: 's',
  //         test: /\.(css|scss)$/,
  //         chunks: 'all',
  //         enforce: true,
  //       },
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'v',
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },
  performance: {
    hints: false,
  },
};

