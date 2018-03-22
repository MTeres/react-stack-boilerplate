/* ------------------------------------------
   Common configuration for all environments
--------------------------------------------- */
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const { utils, paths } = require('../config');

const resolve = () => ({
  alias: {
    components: utils.paths.src('components'),
    containers: utils.paths.src('containers'),
    elements: utils.paths.src('elements'),
    services: utils.paths.src('services'),
    state: utils.paths.src('state'),
    utils: utils.paths.src('utils'),
  },
  modules: [
    'node_modules',
    utils.paths.base('node_modules'),
  ],
  extensions: ['.js', '.json', '.jsx'],
  plugins: [
    new ModuleScopePlugin(utils.paths.src(), [utils.paths.base('package.json')]),
  ],
});
const rules = env => ([
  {
    test: /\.(js|jsx)$/,
    include: utils.paths.src(),
    enforce: 'pre',
    use: [
      {
        options: {
          formatter: eslintFormatter,
          eslintPath: require.resolve('eslint'),
        },
        loader: require.resolve('eslint-loader'),
      },
    ],
  },
  {
    oneOf: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        include: utils.paths.src(),
        loader: require.resolve('url-loader'),
        options: {
          limit: 8000,
          name: `${paths.static}/media/[name].[hash:8].[ext]`,
        },
      },
      {
        test: /\.(js|jsx)$/,
        include: utils.paths.src(),
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          plugins: [
            'transform-object-rest-spread',
            'transform-class-properties',
            'babel-plugin-transform-runtime',
          ],
        },
      },
      {
        test: /\.scss$/,
        use: (env === 'production')
        ? ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [require.resolve("css-loader"), require.resolve("sass-loader")],
          })
        : [{
          loader: require.resolve("style-loader"), // creates style nodes from JS strings
        }, {
          loader: require.resolve("css-loader"), // translates CSS into CommonJS
        }, {
          loader: require.resolve("sass-loader"), // compiles Sass to CSS
        }],
      },
      {
        test: /\.css$/,
        use: (env === 'production')
        ? ExtractTextPlugin.extract({
          fallback: require.resolve('style-loader'),
          use: require.resolve('css-loader'),
        })
        : [require.resolve('style-loader'), require.resolve('css-loader')],
      },
      {
        exclude: [/\.js$/, /\.html$/, /\.json$/],
        loader: require.resolve('file-loader'),
        options: {
          name: `${paths.static}/media/[name].[hash:8].[ext]`,
        },
      },
    ],
  },
]);

module.exports = {
  resolve,
  rules,
};
