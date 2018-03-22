/* ------------------------------------------
   Home - Component
--------------------------------------------- */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { injectIntl, defineMessages } from "react-intl";
import styled, { css } from 'styled-components';
import LeftComponent from '../LeftComponent/LeftComponent';
import RightComponent from '../RightComponent/RightComponent';
import './Home.scss';

const messages = defineMessages({
  tittle: {
    id: 'Home.tittle',
    defaultMessage: 'Hey you are at home, locale: {locale}',
    description: 'Tittle',
  },
});

class Home extends Component {
  static displayName = 'Home';
  static propTypes = {
    intl: PropTypes.object.isRequired,
    updateCurrentLang: PropTypes.func.isRequired,
  };
  render() {
    const { intl: { locale, formatMessage }, updateCurrentLang } = this.props;
    return (
      <Main className="Home">
        <p>{formatMessage(messages.tittle, { locale: locale })}</p>
        <Switch>
          <Route component={LeftComponent} exact path="/home/left" />
          <Route component={RightComponent} exact path="/home/right" />
          <Redirect from="/home" to="/home/left" />
        </Switch>
        <SectionButtons>
          <LocaleButton
            active={locale === 'pt'}
            onClick={() => updateCurrentLang('pt')}
          >
            pt
          </LocaleButton>
          <LocaleButton
            active={locale === 'en'}
            onClick={() => updateCurrentLang('en')}
          >
            en
          </LocaleButton>
          <LocaleButton
            active={locale === 'fr'}
            onClick={() => updateCurrentLang('fr')}
          >
            fr
          </LocaleButton>
        </SectionButtons>
      </Main>
    );
  }
}

// styled components
const Main = styled.div`
  padding: 20px;
  display: block;
  min-height: 100vh;
  > p {
    font-weight: 300;
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    font-size: 20px;
  }
`;

const SectionButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 25%;
  margin: 20px auto;
`;

const LocaleButton = styled.div`
    color: black;
    text-transform: uppercase;
    text-align: center;
    font-size: 20px;
    padding: 15px;
    border-radius: 100%;
    background-color: papayawhip;
    border: 1px solid papayawhip;
    cursor: pointer;
  ${p => p.active && css`
    display: none;
  `};
`;

export default injectIntl(Home);
