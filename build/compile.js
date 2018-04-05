/* ------------------------------------------
   Webpack compiler
--------------------------------------------- */
const webpack = require('webpack');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const clearConsole = require('react-dev-utils/clearConsole');

const { paths } = require('./config');
const prodConfig = require('../build/webpack.config.prod');
const { copyPublic, cleanDist } = require('./utils/fs');
const logger = require('./utils/logger');

const isInteractive = process.stdout.isTTY;

const compile = () => new Promise((resolve, reject) => {
  if (isInteractive) {
    clearConsole();
  }
  logger.line('cyan', '🚀  ');
  logger.cyan(`Start compiler for ${process.env.BACKEND_ENV.toUpperCase()} mode`);
  logger.line('cyan');
  copyPublic()
    .then(() => {
      const compiler = webpack(prodConfig);
      compiler.run((err, stats) => {
        if (err) {
          logger.red('Compiler failed');
          return reject(err);
        }
        const messages = formatWebpackMessages(stats.toJson({}, true));
        if (messages.errors.length) {
          cleanDist();
          logger.line('red', '😱  ');
          logger.red('Compiler has errors');
          logger.nl();
          logger.regular(messages.errors.join('\n\n'));
          logger.nl();
          logger.line('red');
          return reject();
        }
        if (messages.warnings.length) {
          logger.line('yellow', '😢  ');
          logger.yellow('Compiler has warnings');
          logger.nl();
          logger.regular(messages.warnings.join('\n\n'));
          logger.nl();
          logger.line('yellow');
        }
        const verbose = stats.toJson('verbose');
        logger.line('cyan', '🤘  ');
        logger.green('Compiler succeed');
        logger.line('cyan');
        logger.regular('👇 👇 👇 ');
        logger.webpackStats(verbose, { paths });
        logger.line('cyan');
        return resolve({
          stats,
          warnings: messages.warnings,
        });
      });
    });
});

module.exports = compile;
