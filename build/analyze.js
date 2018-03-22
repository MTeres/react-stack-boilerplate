/* ------------------------------------------
   Analyze Webpack Production configuration
--------------------------------------------- */
const webpack = require('webpack');
const clearConsole = require('react-dev-utils/clearConsole');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const logger = require('./logger');
const { paths } = require('../config');
const prodConfig = require('./webpack.config.prod');

const isInteractive = process.stdout.isTTY;

const makeConf = () => ({
  ...prodConfig,
  plugins: [
    ...prodConfig.plugins,
    new BundleAnalyzerPlugin({
      logLevel: 'info',
      analyzerPort: 3002,
    }),
  ],
});

const analyze = () => new Promise((resolve, reject) => {
  if (isInteractive) {
    clearConsole();
  }
  logger.line('cyan', '🔎  ');
  logger.cyan('Starting analyzer');
  logger.cyan('Starting compiler...');
  logger.line('cyan');
  const compiler = webpack(makeConf());
  compiler
    .run((err, stats) => {
      if (err) {
        logger.line('red', '🚨  ');
        logger.red('Error on launching');
        logger.regular(err);
        logger.line('red');
        return reject();
      }
      const verbose = stats.toJson('verbose');
      logger.line('cyan', '🤘  ');
      logger.green('Compiler succeed');
      logger.line('cyan');
      logger.regular('👇 👇 👇 ');
      logger.webpackStats(verbose, { paths });
      logger.line('cyan');
      resolve();
  });
});

module.exports = analyze;

