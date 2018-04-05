/* ------------------------------------------
   Application Root Provider
--------------------------------------------- */
import React, { Component } from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import createStore from 'state/createStore';
import IntlProvider from 'containers/__IntlProvider/Provider';
import Layer from 'containers/__Layer/Layer';

export default class RootContainer extends Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
    this.store = createStore(this.history, {});
  }
  render() {
    return (
      <Provider history={this.history} store={this.store}>
        <ConnectedRouter history={this.history}>
          <IntlProvider>
            <Layer history={this.history} />
          </IntlProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}
