/* ------------------------------------------
   GraphQL service - based on Lokka
   https://github.com/kadirahq/lokka
--------------------------------------------- */
import QueryManager from './queryManager';

const queryManager = new QueryManager();

const userFragment = queryManager.createFragment(`
  fragment on User {
    id
    name
    surname
    email
    profilePictureUrl
    chanceCountries
    phone
  }
`);

export const login = queryManager.createQuery(`
  query jwtLogin($email: String!, $password: String!) {
    jwtLogin(email: $email, password: $password) {
      ...${userFragment}
      token
    }
  }
`);

export const validateToken = queryManager.createQuery(`
  query jwtCheck {
    jwtCheck{
      ...${userFragment}
    }
  }
`);

export default queryManager;
