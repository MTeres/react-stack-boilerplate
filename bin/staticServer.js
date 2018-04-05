/* ------------------------------------------
   Static server
--------------------------------------------- */
const createStaticServer = require('../build/createStaticServer');

createStaticServer()
  .catch(() => {
    process.exit(1);
  });