/* ------------------------------------------
   Local Storage Service
   Wrapper around the browser built-in API
--------------------------------------------- */
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

export const storageKeys = { // List of LocalStorage keys used into the app
  authToken: 'cct-u',
  sidebarFilters: 'cct-sbf',
};

export const setItem = (key, value) => {
  let computed = value;
  if (isObject(value) || isArray(value)) {
    computed = JSON.stringify(value); // Transform as a string if Object or Array provided
  }
  window.localStorage.setItem(key, computed);

  return { key: computed };
};

export const removeItem = key => window.localStorage.removeItem(key);

export const getItem = key => {
  const content = localStorage.getItem(key);
  try {
    return JSON.parse(content); // Parse JSON if valid format
  } catch (e) {
    return content;
  }
};
