/* ------------------------------------------
   GraphQL Error Messages
--------------------------------------------- */

const ERROR_MESSAGES = {
  auth: {
    jwtLogin: {
      // email: 'NO_EMAIL_PROVIDED',
      // password: 'NO_PASSWORD_PROVIDED',
      badCredentials: 'BAD_CREDENTIALS_PROVIDED',
    },
    jwtCheck: {
      token: 'BAD_TOKEN_PROVIDED',
      badCredentials: 'BAD_CREDENTIALS_PROVIDED',
    },
  },
};

export default ERROR_MESSAGES;
