import { combineReducers } from 'redux';
import auth from './modules/auth';
import requests from './modules/requests';
import i18n from './modules/i18n';

export default combineReducers({
  auth,
  requests,
  intl: i18n,
});
