/* ------------------------------------------
   Home - Component
--------------------------------------------- */
import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { updateCurrentLang } from '../../state/modules/i18n';
import Home from '../../components/Home/Home';

const mapStateToProps = () => ({});

const bindActions = { updateCurrentLang };

const decorator = connect(mapStateToProps, bindActions);


class HomeContainer extends Component {
  static displayName = 'Home';
  static propTypes = {
    updateCurrentLang: PropTypes.func.isRequired,
  };
  render() {
    const { updateCurrentLang } = this.props;
    return (<Home updateCurrentLang={updateCurrentLang} />);
  }
}

export default decorator(HomeContainer);
