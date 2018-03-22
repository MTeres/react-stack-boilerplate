/* ------------------------------------------
   Create development server
--------------------------------------------- */
const fs = require('fs');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const {
  choosePort,
  createCompiler,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const openBrowser = require('react-dev-utils/openBrowser');
const clearConsole = require('react-dev-utils/clearConsole');

const logger = require('./logger');
const appConfig = require('../config');
const webpackDevConfig = require('./webpack.config.dev');
const { devServer } = appConfig;

const useYarn = fs.existsSync(appConfig.utils.paths.base('yarn.lock'));
const isInteractive = process.stdout.isTTY;

/* ------------------------------------------
   Create server config
--------------------------------------------- */
const createConfig = allowedHost => ({
  disableHostCheck: appConfig.devServer.disableHostCheck,
  compress: true,
  clientLogLevel: 'info',
  contentBase: `/${appConfig.paths.dist}`,
  watchContentBase: true,
  hot: true,
  publicPath: appConfig.publicPath,
  quiet: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  https: appConfig.devServer.https,
  host: appConfig.devServer.host,
  overlay: false,
  historyApiFallback: {
    disableDotRule: true,
  },
  public: allowedHost,
  setup(app) {
    app.use(errorOverlayMiddleware());
    app.use(noopServiceWorkerMiddleware());
  },
});

/* ------------------------------------------
 Create dev server
 --------------------------------------------- */
const createDevServer = () => {
  if (isInteractive) {
    clearConsole();
  }
  logger.line('cyan', '🚀  ');
  logger.cyan('Staring dev server');
  return choosePort(devServer.host, devServer.port)
    .then(port => {
      if (!port) {
        logger.line('red', '🚨  ');
        logger.red('No available port found');
        logger.line('red');
      }
      const appName = appConfig.appName;
      const protocol = devServer.https ? 'https' : 'http';
      const urls = prepareUrls(protocol, devServer.host, devServer.port);
      const compiler = createCompiler(webpack, webpackDevConfig, appName, urls, useYarn);

      const server = new WebpackDevServer(
        compiler,
        createConfig(urls.lanUrlForConfig)
      );
      server.listen(devServer.port, devServer.host, err => {
        if (err) {
          logger.line('red', '🚨  ');
          logger.red('Error on launching');
          logger.regular(err);
          logger.line('red');
          return;
        }
        logger.green(`Listening on ${devServer.host}:${devServer.port}`);
        openBrowser(urls.localUrlForBrowser);
      });

      ['SIGINT', 'SIGTERM'].forEach(sig => {
        process.on(sig, () => {
          server.close();
          process.exit();
        });
      });
    });
};

module.exports = createDevServer;
