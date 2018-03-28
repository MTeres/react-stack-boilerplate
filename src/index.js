/* ------------------------------------------
  App entry point
--------------------------------------------- */
import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData } from "react-intl";
import IntlProvider from './components/__IntlProvider/Provider';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createStore from './state/createStore';
import registerServiceWorker from './registerServiceWorker';
import Layer from './containers/_Layer/Layer';
import fr from "react-intl/locale-data/fr";
import pt from "react-intl/locale-data/pt";
import en from "react-intl/locale-data/en";
import './styles/global.css';

addLocaleData([...en, ...fr, ...pt]);
const history = createBrowserHistory();
const store = createStore(history, {});
const createApplication = () => (
  <Provider history={history} store={store}>
    <ConnectedRouter history={history}>
      <IntlProvider>
        <Layer history={history} />
      </IntlProvider>
    </ConnectedRouter>
  </Provider>
);

const AppLoaderElem = document.getElementById('AppLoader');
AppLoaderElem.parentNode.removeChild(AppLoaderElem);

const rootElem = document.getElementById('root');
rootElem.style.display = 'block';

ReactDOM.render(createApplication(), rootElem);
registerServiceWorker();
