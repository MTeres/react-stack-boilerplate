/* ------------------------------------------
   Public assets manager
--------------------------------------------- */
const fs = require('fs-extra');

const logger = require('./logger');
const { utils } = require('../config');

const copyPublic = () => new Promise((resolve, reject) => {
  logger.line('cyan', '📸  ');

  if(!fs.exists(utils.paths.dist())) {
    logger.cyan('Create dist directory');
    fs.ensureDirSync(utils.paths.dist());
  }
  fs.emptyDirSync(utils.paths.dist());
  logger.cyan('Copy public files');
  fs.copy(utils.paths.public(), utils.paths.dist(), err => {
    if (err) {
      logger.red('Copy failed');
      logger.regular(err);
      logger.line('red', ' ');
      return reject(err);
    }
    logger.green('Copy succeed');
    logger.line('cyan', ' ');
    return resolve(true);
  });
});

const cleanDist = () => {
  if(!fs.exists(utils.paths.dist())) {
    fs.ensureDirSync(utils.paths.dist());
  }
  fs.emptyDirSync(utils.paths.dist());
};

module.exports = {
  copyPublic,
  cleanDist,
};
