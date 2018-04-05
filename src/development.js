/* ------------------------------------------
  App development entry point
--------------------------------------------- */
import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData } from "react-intl";
import fr from "react-intl/locale-data/fr";
import pt from "react-intl/locale-data/pt";
import en from "react-intl/locale-data/en";
import RedBox from 'redbox-react';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/__Root';
import { prepareRootLayout } from './utils/DOM';
import './styles/global.css';
addLocaleData([...en, ...fr, ...pt]);
const rootElem = prepareRootLayout('root', 'AppLoader');

const render = Component => {
  ReactDOM.render(
    <AppContainer errorReporter={RedBox}>
      <Component />
    </AppContainer>,
    rootElem
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./containers/__Root/index.jsx', () => {
    render(require('./containers/__Root').default); // eslint-disable-line global-require
  });
}
