/* ------------------------------------------
   Express static server
--------------------------------------------- */
const express = require('express');
const path = require('path');
const fs = require('fs');
const {
  choosePort,
} = require('react-dev-utils/WebpackDevServerUtils');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');

const logger = require('./utils/logger');
const config = require('./config/index');

const { utils: { paths } } = config;

const DEFAULT_PORT = 5000;
const isInteractive = process.stdout.isTTY;

const createServer = () => new Promise((resolve, reject) => {
  if (isInteractive) {
    clearConsole();
  }

  logger.line('cyan', '🚀  ');
  logger.cyan('Staring static server');
  logger.line('cyan');

  if (!fs.existsSync(paths.dist())) {
    logger.line('red', '🚨  ');
    logger.red('dist directory not found, run:');
    logger.regular('   yarn build:local | staging | production');
    logger.line('red');
    return reject();
  }

  return choosePort('localhost', DEFAULT_PORT)
    .then(port => {
      if (!port) {
        logger.line('red', '🚨  ');
        logger.red('No available port found');
        logger.line('red');
        return reject();
      }
      const app = express();
      app.use((req, res) => {
        logger.regular(req.method, 'on', req.url);
        const maybeFilePath = path.resolve(paths.dist(), ...req.url.split('/'));
        fs.stat(maybeFilePath, (err, stats) => {
          if (err) {
            return res.sendFile(path.resolve(paths.dist(), 'index.html'));
          }
          if(stats.isDirectory()) {
            return res.sendFile(path.resolve(paths.dist(), 'index.html'));
          }
          return res.sendFile(maybeFilePath);
        });
      });

      app.listen(DEFAULT_PORT, () => {
        logger.line('green', '💡  ');
        logger.green(`Listening on port http://localhost:${port}`);
        logger.line('green');
        openBrowser(`http://localhost:${port}`);
      });
    });
});

module.exports = createServer;
