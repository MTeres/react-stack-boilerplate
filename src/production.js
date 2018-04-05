/* ------------------------------------------
  App production entry point
--------------------------------------------- */
import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData } from "react-intl";
import fr from "react-intl/locale-data/fr";
import pt from "react-intl/locale-data/pt";
import en from "react-intl/locale-data/en";

import Root from './containers/__Root';
import { prepareRootLayout } from './utils/DOM';
import './styles/global.css';

addLocaleData([...en, ...fr, ...pt]);
const rootElem = prepareRootLayout('root', 'AppLoader');

ReactDOM.render(
  (<Root />),
  rootElem
);
