/* ------------------------------------------
  QueryManager
  based on https://github.com/kadirahq/lokka
--------------------------------------------- */
import uuid from 'uuid';
import isEmpty from 'lodash/isEmpty';

export default class QueryManager {
  constructor() {
    this._fragments = {};
    this._queries = {};
  }
  createFragment(fragment) {
    if (!fragment) {
      throw new Error('fragment is required!');
    }
    const name = 'f' + uuid.v4().replace(/-/g, '');
    this._fragments[name] = fragment.replace('fragment', `fragment ${name}`);
    return name;
  }
  _findFragments(queryOrFragment, fragmentsMap = {}) {
    const matched = queryOrFragment.match(/\.\.\.[A-Za-z0-9]+/g);
    if (matched) {
      const fragmentNames = matched.map(name => name.replace('...', ''));
      fragmentNames.forEach(name => {
        const fragment = this._fragments[name];
        if (!fragment) {
          throw new Error(`There is no such fragment: ${name}`);
        }
        fragmentsMap[name] = fragment;
        this._findFragments(fragment, fragmentsMap);
      });
    }
    return Object.keys(fragmentsMap).map(key => fragmentsMap[key]);
  }
  createQuery(query) {
    if (!query) {
      throw new Error('query is required');
    }
    const name = 'f' + uuid.v4().replace(/-/g, '');
    this._queries[name] = `${query}`;
    return name;
  }
  _findQuery(queryName) {
    if (!queryName) {
      throw new Error('queryName is required');
    }
    if(!Object.prototype.hasOwnProperty.call(this._queries, queryName)) {
      throw new Error(`There is no such query: ${queryName}`);
    }
    return this._queries[queryName];
  }
  compute(queryName, vars = {}, operationName) {
    const query = this._findQuery(queryName);
    const fragments = this._findFragments(query);
    return {
      query: `${query}\n${fragments.join('\n')}`,
      ...(!isEmpty(vars)) ? { variables: vars } : {},
      ...operationName ? { operationName } : {},
    };
  }
}