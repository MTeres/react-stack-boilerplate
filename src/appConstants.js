/* ------------------------------------------
   APP CONSTANTS
--------------------------------------------- */
const base = { // For all environment
  AWS_S3_URL: 'https://s3.amazonaws.com',
};

const development = { // For development environment only
  SOCKET_URL: 'http://localhost:8000',
  GRAPHQL_ENDPOINT: 'http://localhost:8000/graph',
  UPLOAD_ENDPOINT: 'http://localhost:8000/upload',
  CHANCE_PROFILE_URL: 'http://localhost:3000',
};

const appConstants = () => {
  switch (process.env.BACKEND_ENV) {
    default: {
      return Object.assign({
        env: 'development',
      }, base, development);
    }
  }
};

export default appConstants();
