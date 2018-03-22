/* ------------------------------------------
   HTTP API Service
--------------------------------------------- */
import APP_CONSTANTS from '../../appConstants';
import Fetch from '../fetch';
import { getToken } from '../auth';
import queryManager, * as queries from '../graphQL/queries';

const graphRequest = new Fetch({
  endpoint: APP_CONSTANTS.GRAPHQL_ENDPOINT,
  getAuthToken: getToken,
  isGraphQL: true,
});

const apiRequests =  {
  login: (email, password) => {
    return graphRequest.execute(
      queryManager.compute(queries.login, { email, password }),
      { isAuthRequired: false }
    );
  },
  validateToken: () => {
    return graphRequest.execute(
      queryManager.compute(queries.validateToken),
      { isAuthRequired: true }
    );
  },
};

export default apiRequests;
