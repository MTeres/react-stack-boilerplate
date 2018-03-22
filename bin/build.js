/* ------------------------------------------
   Build core
--------------------------------------------- */
const compile = require('../build/compile');

compile()
  .then(() => {
    process.exit(0);
  })
  .catch(() => {
    process.exit(1);
  });
