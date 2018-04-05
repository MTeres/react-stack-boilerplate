/* ------------------------------------------
 * ConnectedIntlProvider
 *------------------------------------------- */
import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

const mapStateToProps = state => {
  const { current, messages } = state.intl;
  return {
    key: current,
    locale: current,
    messages: messages[current],
  };
};

export default connect(mapStateToProps)(IntlProvider);
