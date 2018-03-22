/* ------------------------------------------
   Watch
--------------------------------------------- */
const createDevServer = require('../build/createDevServer');

createDevServer()
  .catch(() => {
    process.exit(1);
  });