/* ------------------------------------------
   Common configuration for all environments
--------------------------------------------- */
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

const { utils, paths } = require('./config');

const resolve = () => ({
  alias: {
    components: utils.paths.src('components'),
    containers: utils.paths.src('containers'),
    elements: utils.paths.src('elements'),
    services: utils.paths.src('services'),
    state: utils.paths.src('state'),
    utils: utils.paths.src('utils'),
    __propTypes__: utils.paths.src('__propTypes__'),
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
        loader: require.resolve('eslint-loader'),
        options: {
          formatter: eslintFormatter,
          eslintPath: require.resolve('eslint'),
        },
      },
    ],
  },
  {
    oneOf: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.mp3$/],
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
      },
      {
        test: /\.scss$/,
        use: (env === 'production')
          ? [
            MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: { minimize: true },
            },
            require.resolve('sass-loader'),
          ]
          : [
            require.resolve('style-loader'),
            require.resolve('css-loader'),
            require.resolve('sass-loader'),
          ],
      },
      {
        test: /\.css$/,
        use: (env === 'production')
        ? [
            MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: { minimize: true },
            },
        ]
        : [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
        ],
      },
      {
        exclude: [/\.js$/, /\.html$/, /\.json$/],
        loader: require.resolve('file-loader'),
        options: {
          name: `${paths.static}/files/[name].[hash:8].[ext]`,
        },
      },
    ],
  },
]);
const plugins = () => ([
  // TODO: waiting for jetBrains support
  // new DirectoryNamedWebpackPlugin({
  //   honorIndex: true,
  //   exclude: /node_modules/,
  //   include: [
  //     utils.paths.src(),
  //   ],
  // }),
]);

module.exports = {
  resolve,
  rules,
  plugins,
};
