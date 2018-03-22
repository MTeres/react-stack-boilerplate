/* ------------------------------------------
   Fetch service
--------------------------------------------- */
let fetchUrl;
const isNode = new Function('try {return this===global;}catch(e){return false;}');
if (typeof fetch === 'function') {
  fetchUrl = fetch;
} else if (isNode()) {
  fetchUrl = require('node-fetch'); // eslint-disable-line
  fetchUrl.Promise = Promise;
} else {
  require('whatwg-fetch'); // eslint-disable-line
  fetchUrl = fetch;
}

export default class FetchService {
  static errorHandler(errors, data) {
    const message = errors[0].message || 'ERROR_MESSAGE_IS_NOT_SET';
    throw {
      message,
      rawError: errors,
      rawData: data,
    };
  }
  constructor(options = {}) {
    if (!options.endpoint) {
      throw new Error('options.endpoint is required');
    }
    this._endpoint = options.endpoint;
    if (!options.getAuthToken && !(typeof options.getAuthToken !== 'function')) {
      throw new Error('options.getAuthToken is required');
    }
    this._getAuthToken = options.getAuthToken;
    this._errorHandler = options.errorHandler || FetchService.errorHandler;
    this._httpOptions = {
      headers: options.headers || {},
      method: options.method || 'post',
      contentType: options.contentType || 'application/json',
    };
    this.isJSONStringify = options.isJSONStringify;
    this.isGraphQL = options.isGraphQL || false;
  }
  async _buildOptions(payload, isAuthRequired = false ) {
    return {
      method: this._httpOptions.method,
      headers: {
        Accept: 'application/json',
        'Content-Type': this._httpOptions.contentType,
        ...this._httpOptions.headers,
        ...isAuthRequired
          ? {
            Authorization: await this._getAuthToken.call(),
          }
          : {},
      },
      body: this.isJSONStringify === false ? payload : JSON.stringify(payload),
    };
  }
  async execute(payload, { isAuthRequired, route = '' }) {
    const fetchOptions = await this._buildOptions(payload, isAuthRequired);
    const response = await fetchUrl(`${this._endpoint}${route}`, fetchOptions);
    if (this._httpOptions.contentType !== 'application/json') {
      if (response.status < 200 || response.status > 299) {
        this._errorHandler(response, response);
      }
      return response;
    }
    const body = await response.json();
    if (response.status < 200 || response.status > 299) {
      this._errorHandler(body, response);
    }
    if (!this.isGraphQL) {
      return body;
    }
    const { data, errors } = body;
    if (errors) {
      this._errorHandler(errors, data);
      return null;
    }
    return data;
  }
};
