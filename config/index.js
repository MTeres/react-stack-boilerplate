/* ------------------------------------------
   Config core
--------------------------------------------- */
const { existsSync } = require('fs');
const { resolve } = require('path');
const merge = require('lodash/merge');

const config = require('./_base');
const logger = require('../build/logger');

logger.line('cyan', '🛠  ');
logger.cyan(`Prepare configuration for ${config.env.toUpperCase()} environment`);

let overrides = {};
const overridesFilename = `_${config.env}.js`;
if (existsSync(resolve(__dirname, overridesFilename))) {
  // eslint-disable-next-line
  overrides = require(`./${overridesFilename}`)(config);
  logger.green('Apply configuration overrides');
  logger.regular(overrides);
} else {
  logger.red('No configuration overrides found');
}
logger.line('cyan');
logger.nl();

module.exports = merge({ ...config }, overrides);
