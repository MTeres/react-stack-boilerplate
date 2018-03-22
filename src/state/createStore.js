import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers';
import apiRequestsMiddleware from './middlewares/createApiMiddleware';
import apiRequests from '../services/httpApi';

const env = process.env.REACT_APP_STACK;

// Export the store creator to the app entry
export default function createStore(history, initialState = {}) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && env !== 'production'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
  const storeEnhancer =
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history),
        apiRequestsMiddleware(apiRequests),
      ));
  // Execute the redux built-in store creator
  const store = createReduxStore(rootReducer, initialState, storeEnhancer);

  // Allow HMR implementation for redux (not used today) : https://goo.gl/wZxa5o
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
