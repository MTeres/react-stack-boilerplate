/* ------------------------------------------
   Base config
--------------------------------------------- */
const { resolve } = require('path');

config = {
  appName: 'Chance React Starter',
  env: process.env.NODE_ENV || 'development',
  paths: {
    base: resolve(__dirname, '..', '..'),
    src: 'src',
    config: 'config',
    build: 'build',
    dist: 'dist',
    static: 'static',
    public: 'public',
    i18n: 'i18n',
  },
  devServer: {
    https: false,
    host: 'localhost',
    port: process.env.PORT || 3000,
    disableHostCheck: false,
  },
  publicPath: '/static/',
  indexReplace: {
    PUBLIC_URL: '/',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt', 'fr'],
  },
};

/* ------------------------------------------
   Utils
--------------------------------------------- */
config.utils = {
  paths: (() => {
    const base = (...args) =>
      resolve.apply(resolve, [config.paths.base, ...args]);
    return {
      base   : base, // eslint-disable-line
      src : base.bind(null, config.paths.src),
      config : base.bind(null, config.paths.config),
      build : base.bind(null, config.paths.build),
      dist : base.bind(null, config.paths.dist),
      distStatic : base.bind(null, config.paths.dist, config.paths.static),
      public : base.bind(null, config.paths.public),
      developmentEntry: base.bind(null, config.paths.src, 'development'),
      productionEntry: base.bind(null, config.paths.src, 'production'),
      i18n : base.bind(null, config.paths.i18n),
    };
  })(),
};

/* ------------------------------------------
 Environment
 N.B.: globals added here must _also_ be added to .eslintrc
--------------------------------------------- */
config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env),
    'BABEL_ENV': JSON.stringify(config.env),
    'BACKEND_ENV': JSON.stringify(process.env.BACKEND_ENV || 'development'),
  },
  'NODE_ENV': config.env,
  'BABEL_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
};

module.exports = config;
