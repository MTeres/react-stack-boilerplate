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

// Merge configuration constants based on REACT_APP_ENV
// More about env constants : https://goo.gl/r2V3sy
const appConstants = () => {
  switch (process.env.REACT_APP_STACK) {
    default: {
      return Object.assign({
        env: 'development',
      }, base, development);
    }
  }
};

export default appConstants();
