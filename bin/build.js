/* ------------------------------------------
   Build core
--------------------------------------------- */
const compile = require('../build/compile');

compile()
  .then(() => {
    process.exit(0);
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
